export const FETCH = "FETCH";
export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";

export const products_initialState = {
    products: [],
    loading: true,
    error: ''
}

export const product_reducer = (state, { type, payload }) => {
    switch (type) {
        case FETCH:
            return {
                ...state,
                loading: true
            }
        case SUCCESS:
            return {
                ...state,
                products: payload,
                loading: false,
            }
        case FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}