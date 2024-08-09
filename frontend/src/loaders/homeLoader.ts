import {getPosts} from "../apis/post.api.ts";
import {getUserNotifications} from "../apis/user.api.ts";

export const homeLoader = async () => {
    const posts = await getPosts()
    const userNotifications = await getUserNotifications()


    return {posts, userNotifications}
}