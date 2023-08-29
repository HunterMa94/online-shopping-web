import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    GET_PRO_BY_PAGINATE,
    ADD_PRODUCT,
    CLEAR_PRODUCT_ADD,
    GET_PROD_BY_ID,
    CLEAR_CURRENT_PRODUCT
} from "../types"

export default function productsReducer(state = {}, action) {
    switch (action.type) {
        case GET_PROD_BY_SOLD:
            return { ...state, bySold: action.payload }
        case GET_PROD_BY_DATE:
            return { ...state, byDate: action.payload }
        case GET_PRO_BY_PAGINATE:
            return { ...state, byPaginate: action.payload }
        case ADD_PRODUCT:
            return { ...state, lastAdded: action.payload }
        case CLEAR_PRODUCT_ADD:
            return { ...state, lastAdded: null };
        case GET_PROD_BY_ID:
            return { ...state, byId: action.payload };
        case CLEAR_CURRENT_PRODUCT:
            return { ...state, byId: null };
        default:
            return state;
    }
}