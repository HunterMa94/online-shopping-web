import * as actions from "./index"
import axios from "axios"

import { getAuthHeader } from "../../utils/tools"
axios.defaults.headers.post["Content-type"] = 'application/json';

export const updateSiteVars = (args) => {
    return async (dispatch) => {
        try {
            const sites = await axios.patch('/api/site/', args, getAuthHeader());
            // console.log(sites.data);
            dispatch(actions.updateSiteVars(sites.data))
            dispatch(actions.successGlobal("Good job"));
        } catch (error) {
            dispatch(actions.errorGlobal("Please check and try again"));
        }


    }
}