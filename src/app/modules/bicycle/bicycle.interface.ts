export type TBicycle = {
  name?: string;
  productImg?: string;
  brand?:
    | 'CityRide'
    | 'UrbanMotion'
    | 'TrailPro'
    | 'KidBike'
    | 'GreenWheel'
    | 'Velocita'
    | 'HealthBike'
    | 'SpeedBikes'
    | 'ElectraBike';

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
