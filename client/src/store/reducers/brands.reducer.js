import {
    GET_ALL_BRANDS
} from "../types"

export default function brandReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_BRANDS:
            return { ...state, all: action.payload }
        default:
            return state
    }
}