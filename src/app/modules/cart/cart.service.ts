import { Cart } from "./cart.model";


const getUserCartItemsFromDB = async (userId: string) => {
  const all = await Cart.find({ userId }).populate('productId');
  const cartItems = all.filter((item: any) => !item.savedForLater);
  const savedItems = all.filter((item: any) => item.savedForLater);
  return { cartItems, savedItems };
};

const addOrUpdateCartItemInDB = async (userId: string, productId: string) => {
  let item = await Cart.findOne({ userId, productId });
  if (item) {
    item.quantity += 1;
    await item.save();
  } else {
    item = await Cart.create({ userId, productId, quantity: 1 });
  }
  return item;
};

const updateCartItemQuantityInDB = async (
  cartItemId: string,
  quantity: number,
) => {
  const item = await Cart.findByIdAndUpdate(
    cartItemId,
    { quantity },
    { new: true },
  );
  return item;
};

const toggleSaveCartItemInDB = async (cartItemId: string, userId: string) => {
  const item = await Cart.findOne({ _id: cartItemId, userId });
  if (!item) return null;

  item.savedForLater = !item.savedForLater;
  await item.save();
  return item;
};

const deleteCartItemFromDB = async (cartItemId: string, userId: string) => {
  return await Cart.findOneAndDelete({ _id: cartItemId, userId });
};

export const CartService = {
  getUserCartItemsFromDB,
  addOrUpdateCartItemInDB,
  updateCartItemQuantityInDB,
  toggleSaveCartItemInDB,
  deleteCartItemFromDB,
};
