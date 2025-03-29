
export interface ProductFormData {
  name: string;
  price: string;
  stock: number;
  description: string;
  categories: string[];
  discount: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: string;
  };
  attributes: Array<{
    name: string;
    value: string;
  }>;
  variations: Array<{
    name: string;
    options: string[];
  }>;
  expiryDate: string;
  scheduledTime: string;
}

export interface ExpandedSections {
  attributes: boolean;
  discount: boolean;
  categories: boolean;
  variations: boolean;
  expiryDate: boolean;
  scheduledTime: boolean;
}
