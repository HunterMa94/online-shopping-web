import {
    AUTH_ESER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    USER_ADD_TO_CART,
    GET_ALL_PRODUCTS_FROM__USER_CART,
    CLEAR_CART,
    GET_ALL_PRODUCTS_FROM__USER_History
} from "../types"

let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        history: [],
        verified: null
    },
    auth: null,
    cart: [],
    history: []
}

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
    switch (action.type) {
        case AUTH_ESER:
            return {
                ...state,
                data: { ...state.data, ...action.payload.data },
                auth: action.payload.auth
            }
        case SIGN_OUT:
            return {
                ...state,
                data: { ...DEFAULT_USER_STATE.data },
                auth: false
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            }
        case USER_CHANGE_EMAIL:
            return {
                ...state,
                data: { ...state.data, email: action.payload }
            }
        case USER_ADD_TO_CART:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            }
        case GET_ALL_PRODUCTS_FROM__USER_CART:
            return {
                ...state,
                cart: [...action.payload]
            }
        case CLEAR_CART:
            return {
                ...state,
                data: { ...state.data, cart: [] }
            }
        case GET_ALL_PRODUCTS_FROM__USER_History:
            return {
                ...state,
                history: [...action.payload]
            }
        default:
            return state
    }
}
