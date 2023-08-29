import * as actions from "./index"
import axios from "axios"

import { getAuthHeader, removeTokenCookie, getTokenCookie } from "../../utils/tools"

axios.defaults.headers.post["Content-type"] = 'application/json';

export const userRegister = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/auth/register`, {
                email: values.email,
                password: values.password
            });

            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.successGlobal("Welcome !! check your email to verify account."))
        } catch (error) {
            dispatch(actions.errorGlobal(error.message))
        }
    }
}

export const userSignin = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/auth/signin`, {
                email: values.email,
                password: values.password
            });
            // console.log(user);

            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.successGlobal("Welcome back!!"))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userIsAuth = () => {
    return async (dispatch) => {
        try {

            const site = await axios.get(`/api/site`)
            // console.log(site.data[0]);
            dispatch(actions.siteGetVars(site.data[0]))

            if (!getTokenCookie()) {
                throw new Error();
            }

            // console.log("working");
            const user = await axios.get(`/api/auth/isauth`, getAuthHeader());
            // console.log(user.data);
            dispatch(actions.userAuthenticate({
                data: user.data,
                auth: true
            }))
        } catch (error) {
            dispatch(actions.userAuthenticate({ data: {}, auth: false }))
        }
    }
}

export const userSignOut = () => {
    return async (dispatch) => {
        try {
            removeTokenCookie();
            dispatch(actions.userSignOut({ data: {}, auth: false }))
            dispatch(actions.successGlobal("Good Bye~"))
        } catch (error) {

        }
    }
}

export const userUpdateProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data);
            const profile = await axios.patch("/api/users/profile", {
                data: data
            }, getAuthHeader());

            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname
            }

            dispatch(actions.userUpdateProfile(userData))
            dispatch(actions.successGlobal("Profile updated!"))


        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userChangeEmail = (data) => {
    return async (dispatch) => {
        try {
            await axios.patch("/api/users/email", {
                email: data.email,
                newemail: data.newemail
            }, getAuthHeader());

            dispatch(actions.userChangeEmail(data.newemail))
            dispatch(actions.successGlobal("Email updated! Rember verify your new email!"))


        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userAddToCart = (item) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.data.cart;

            if (cart.some(element => element === item._id)) {
                dispatch(actions.errorGlobal(`It already in your cart`));
            } else {
                const newCart = [...cart, item._id];

                const profile = await axios.patch("/api/users/profile", {
                    data: { cart: newCart }
                }, getAuthHeader());

                const userData = {
                    ...getState().users.data,
                    cart: profile.data.cart,
                }

                dispatch(actions.userUpdateProfile(userData));
                dispatch(actions.successGlobal(`${item.model} added to cart :)`));
            }

        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const getProdectsFromCart = (cart) => {
    return async (dispatch) => {
        try {
            const products = await Promise.all(cart.map(async (id) => {
                const response = await axios.get(`/api/products/product/${id}`);
                return response.data;
            }));
            // console.log(products);
            dispatch(actions.getProdectsFromCart(products))

        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const deleteProdectsFromCart = (id) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.data.cart;
            const index = cart.indexOf(id)

            if (index !== -1) {
                cart.splice(index, 1)

                const profile = await axios.patch("/api/users/profile", {
                    data: { cart: cart }
                }, getAuthHeader());

                const userData = {
                    ...getState().users.data,
                    cart: profile.data.cart,
                }

                dispatch(actions.userUpdateProfile(userData));
                dispatch(actions.successGlobal("This item has been moved"));
            }

        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}


export const userVerify = (token) => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/users/verify?validation=${token}`)
            dispatch(actions.successGlobal("User verified"))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const clearCart = (cart) => {
    return async (dispatch, getState) => {
        try {
            // console.log(cart);
            const historyCart = getState().users.data.history;
            const crateHistory = {
                cart: [],
                history: [...historyCart, ...cart]
            };
            const profile = await axios.patch("/api/users/profile", {
                data: crateHistory
            }, getAuthHeader());

            dispatch(actions.clearCart())
            dispatch(actions.successGlobal("Thank you!"))
        } catch (error) {
            dispatch(actions.successGlobal(error.response.data.message))
        }
    }
}


export const getProdectsFromHistory = (history) => {
    return async (dispatch) => {
        try {
            const products = await Promise.all(history.map(async (id) => {
                const response = await axios.get(`/api/products/product/${id}`);
                return response.data;
            }));
            // console.log(products);
            dispatch(actions.getProdectsFromHistory(products))

        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

