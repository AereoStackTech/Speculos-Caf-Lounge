'use server';

import { OrderSubmissionPayload, OrderTicket } from '@/lib/types';
import { CAFE_INFO } from '@/data/menu';

export async function submitQuickOrder(
  payload: OrderSubmissionPayload
): Promise<{ success: boolean; ticket?: OrderTicket; error?: string }> {
  try {
    if (!payload.customerName || payload.customerName.trim().length < 2) {
      return { success: false, error: 'Please provide your name.' };
    }

    if (!payload.customerPhone || payload.customerPhone.trim().length < 8) {
      return { success: false, error: 'Please enter a valid phone number (e.g. 06 61 23 45 67).' };
    }

    if (!payload.items || payload.items.length === 0) {
      return { success: false, error: 'Your pickup tray is empty. Please select at least one item.' };
    }

    // Generate readable order ticket number
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = payload.pickupType === 'drive-thru' ? 'DRV' : 'PCK';
    const ticketId = `${prefix}-${randomCode}`;

    // Compute estimated ready minutes based on items
    const basePrepTime = payload.pickupType === 'drive-thru' ? 5 : 8;
    const additionalTime = Math.min(payload.items.length * 2, 10);
    const estimatedReadyMinutes = basePrepTime + additionalTime;

    let pickupTimeLabel = 'ASAP (Immediate Preparation)';
    if (payload.pickupTime === '15mins') pickupTimeLabel = 'In 15 Minutes';
    if (payload.pickupTime === '30mins') pickupTimeLabel = 'In 30 Minutes';
    if (payload.pickupTime === 'specific' && payload.customTime) {
      pickupTimeLabel = `Specific Time: ${payload.customTime}`;
    }

    const itemsSummary = payload.items.map((item) => {
      let optionsStr = '';
      if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
        optionsStr = Object.entries(item.selectedOptions)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
      }
      return {
        name: item.name,
        quantity: item.quantity,
        optionsSummary: optionsStr || undefined,
        lineTotal: item.price * item.quantity,
      };
    });

    // Construct a friendly WhatsApp message
    const lines = [
      `☕ *NOUVELLE COMMANDE - SPECULOS CAFÉ & LOUNGE*`,
      `*N° Ticket:* #${ticketId}`,
      `*Client:* ${payload.customerName}`,
      `*Téléphone:* ${payload.customerPhone}`,
      `*Mode:* ${payload.pickupType === 'drive-thru' ? '🚗 Drive-Thru Express' : '🚶 Retrait au Comptoir (Takeaway)'}`,
      payload.carDetails ? `*Véhicule:* ${payload.carDetails}` : '',
      `*Heure de retrait souhaitée:* ${pickupTimeLabel}`,
      ``,
      `*Articles commandés:*`,
      ...itemsSummary.map(
        (it) => `• ${it.quantity}x ${it.name} ${it.optionsSummary ? `(${it.optionsSummary})` : ''} — ${it.lineTotal} MAD`
      ),
      ``,
      `*TOTAL:* ${payload.totalMad} MAD`,
      payload.specialInstructions ? `*Instructions spéciales:* ${payload.specialInstructions}` : '',
      ``,
      `Merci ! Prêt pour retrait à Avenue Hassan II, Safi.`,
    ].filter(Boolean);

    const whatsappMessage = encodeURIComponent(lines.join('\n'));
    const whatsAppUrl = `https://wa.me/${CAFE_INFO.whatsappRaw}?text=${whatsappMessage}`;

    const ticket: OrderTicket = {
      ticketId,
      createdAt: new Date().toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' }),
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      pickupType: payload.pickupType,
      pickupTimeLabel,
      carDetails: payload.carDetails,
      items: itemsSummary,
      totalMad: payload.totalMad,
      estimatedReadyMinutes,
      whatsAppUrl,
    };

    return {
      success: true,
      ticket,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to submit order';
    return { success: false, error: errorMsg };
  }
}
