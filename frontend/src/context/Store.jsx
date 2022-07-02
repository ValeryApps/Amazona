import { createContext } from "react";
import { useReducer } from "react";

export const CART_ADD_ITEMS = "CART_ADD_ITEMS";
export const CART_REMOVE_ITEMS = "CART_REMOVE_ITEMS";
export const SIGNIN_USER = "SIGNIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS";
export const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";

const user = JSON.parse(localStorage.getItem("user"));
const stored_cart = JSON.parse(localStorage.getItem("cartItems"));
const shipping = JSON.parse(localStorage.getItem("shipping"));
const payment = JSON.parse(localStorage.getItem("payment"));

const initialState = {
  cart: {
    cartItems: stored_cart || [],
    shipping_data: shipping || {},
    payment_method: payment || null,
  },
  user_info: user || null,
};
const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEMS:
      const newItem = payload;
      const existingItem = state.cart.cartItems.find(
        (x) => x._id === newItem._id
      );

      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    case CART_REMOVE_ITEMS: {
      const cartItems = state.cart.cartItems.filter(
        (x) => x._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case SIGNIN_USER:
      return {
        ...state,
        user_info: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user_info: null,
        cart: {
          cartItems: [],
          shipping_data: {},
        },
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shipping_data: payload,
        },
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: {
          ...state.cart,
          payment_method: payload,
        },
      };
    default:
      return state;
  }
};
export const Store = createContext();
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
