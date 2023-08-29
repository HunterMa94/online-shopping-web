import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_ESER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    GET_PRO_BY_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    ADD_PRODUCT,
    CLEAR_PRODUCT_ADD,
    GET_PROD_BY_ID,
    CLEAR_CURRENT_PRODUCT,
    USER_ADD_TO_CART,
    GET_ALL_PRODUCTS_FROM__USER_CART,
    GET_SITE_VARS,
    UPDATE_SITE_VARS,
    CLEAR_CART,
    GET_ALL_PRODUCTS_FROM__USER_History
} from "../types"

// user
export const userAuthenticate = (user) => ({
    type: AUTH_ESER,
    payload: user
})

export const userSignOut = () => ({
    type: SIGN_OUT,
    payload: {}
})

export const userUpdateProfile = (user) => ({
    type: UPDATE_USER_PROFILE,
    payload: user
})

export const userChangeEmail = (data) => ({
    type: USER_CHANGE_EMAIL,
    payload: data
})

export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART,
    payload: data
})

export const getProdectsFromCart = (data) => ({
    type: GET_ALL_PRODUCTS_FROM__USER_CART,
    payload: data
})

export const clearCart = () => ({
    type: CLEAR_CART
})

export const getProdectsFromHistory = (data) => ({
    type: GET_ALL_PRODUCTS_FROM__USER_History,
    payload: data
})


//products
export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
})

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PRO_BY_PAGINATE,
    payload: products
})

export const productRemove = () => ({
    type: REMOVE_PRODUCT
})

export const productAdd = (product) => ({
    type: ADD_PRODUCT,
    payload: product
})

export const clearProductAdd = () => ({
    type: CLEAR_PRODUCT_ADD
})

export const productsById = (product) => ({
    type: GET_PROD_BY_ID,
    payload: product
})

export const clearCurrentProduct = () => ({
    type: CLEAR_CURRENT_PRODUCT
})

//notification
export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

// BRANDS
export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands
})


//site
export const siteGetVars = (vars) => ({
    type: GET_SITE_VARS,
    payload: vars
})

export const updateSiteVars = (vars) => ({
    type: UPDATE_SITE_VARS,
    payload: vars
})