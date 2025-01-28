export type TBicycle = {
  name?: string;
  productImg?:string,
  brand?: string;
  price?: number;
  model?: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  category:
    | 'Outdoor'
    | 'Sport'
    | 'Urban'
    | 'Adventure'
    | 'Electric'
    | 'Kids'
    | 'Racing'
    | 'Fitness';
  description?: string;
  quantity?: number;
  stock?: boolean;
};
