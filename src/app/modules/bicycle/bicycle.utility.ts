import { Bicycle } from "./bicycle.model";


// Function to update stock dynamically whenever quantity is changed
export const updateBicycleStock = async (bicycleId: string) => {
  const bicycle = await Bicycle.findById(bicycleId);
  if (!bicycle) return;

  const isInStock = (bicycle.quantity ?? 0) > 0; // Ensure quantity check is safe

  if (bicycle.stock !== isInStock) {
    await Bicycle.updateOne({ _id: bicycleId }, { stock: isInStock });
  }
};
