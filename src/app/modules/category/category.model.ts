import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.interface';

// Extend Mongoose Document with ICategory
interface ICategoryDocument extends Document, ICategory {}

// Define the schema
const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Category icon is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre<ICategory>('validate', function (next) {
  if (this instanceof Document) {
    if (this.isModified('name') && !this.slug) {
      this.slug = this.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  }
  next();
});

export const Category = model<ICategoryDocument>('Category', categorySchema);
