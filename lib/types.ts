export type MenuItemCategory =
  | 'all'
  | 'specialty-coffee'
  | 'cold-drinks'
  | 'breakfast-combos'
  | 'pastries'
  | 'savory';

export interface MenuItemOption {
  name: string;
  choices: { label: string; priceDelta: number }[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameFr: string;
  nameAr: string;
  category: 'specialty-coffee' | 'cold-drinks' | 'breakfast-combos' | 'pastries' | 'savory';
  price: number; // in MAD (Moroccan Dirhams)
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  tags?: string[];
  prepTimeMinutes: number;
  calories?: number;
  isHouseFavorite?: boolean;
  isVegetarian?: boolean;
  imageTheme: {
    bgGradient: string;
    accentColor: string;
    iconName: string;
    photoUrl?: string;
  };
  options?: MenuItemOption[];
}

export interface TrayItem {
  id: string; // unique item cart instance id
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: Record<string, string>;
  notes?: string;
}

export type PickupType = 'takeaway-counter' | 'drive-thru' | 'dine-in-express';

export interface OrderSubmissionPayload {
  customerName: string;
  customerPhone: string;
  pickupType: PickupType;
  pickupTime: 'asap' | '15mins' | '30mins' | 'specific';
  customTime?: string;
  carDetails?: string; // for drive-thru
  specialInstructions?: string;
  items: TrayItem[];
  totalMad: number;
}

export interface OrderTicket {
  ticketId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  pickupType: PickupType;
  pickupTimeLabel: string;
  carDetails?: string;
  items: {
    name: string;
    quantity: number;
    optionsSummary?: string;
    lineTotal: number;
  }[];
  totalMad: number;
  estimatedReadyMinutes: number;
  whatsAppUrl: string;
}
