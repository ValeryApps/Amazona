export const FETCH_PRODUCT = "FETCH";
export const FETCH_SUCCESS = "SUCCESS";
export const FETCH_FAIL = "FAIL";

export const product_details_initialState = {
  product: null,
  loading: true,
  error: ''
}

export const product_details_reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        loading: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      }
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }

    default:
      return state;
  }
}