import {getUserFavorites} from "../apis/user.api.ts";

export const favoritesLoader = async () => {
    return getUserFavorites()
}