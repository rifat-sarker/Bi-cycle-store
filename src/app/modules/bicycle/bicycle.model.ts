import { model, Schema } from 'mongoose';
import { TBicycle } from './bicycle.interface';
import slugify from 'slugify';

const bicycleSchema = new Schema<TBicycle>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, required: true, unique: true, trim: true },
    productImg: {
      type: String,
    },
    brand: {
      type: String,
      enum: {
        values: [
          'CityRide',
          'UrbanMotion',
          'TrailPro',
          'KidBike',
          'GreenWheel',
          'Velocita',
          'HealthBike',
          'SpeedBikes',
          'ElectraBike',
        ],
        message: '{VALUE} is not supported',
      },
    },
    model: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not supported',
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

bicycleSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// create Bicycle model
export const Bicycle = model<TBicycle>('Bicycle', bicycleSchema);
