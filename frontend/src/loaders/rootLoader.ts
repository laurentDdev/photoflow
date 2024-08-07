import {getCurrentUser} from "../apis/auth.api.ts";

export const rootLoader = async () => {
    return getCurrentUser()
}