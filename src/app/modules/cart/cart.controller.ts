import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';

export const getCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await CartService.getUserCartItemsFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

export const addOrUpdateCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const result = await CartService.addOrUpdateCartItemInDB(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart item added or updated successfully',
    data: result,
  });
});

export const updateQuantity = catchAsync(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  const result = await CartService.updateCartItemQuantityInDB(
    cartItemId,
    quantity,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quantity updated successfully',
    data: result,
  });
});

export const toggleSaveCartItem = catchAsync(async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user._id;
  const item = await CartService.toggleSaveCartItemInDB(cartItemId, userId);
  if (!item) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Cart item not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart item saved for later toggled successfully',
    data: item,
  });
});

export const deleteCartItem = catchAsync(async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user._id;
  await CartService.deleteCartItemFromDB(cartItemId, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart item deleted successfully',
    data: null,
  });
});
