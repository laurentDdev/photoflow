import {getPosts} from "../apis/post.api.ts";

export const postsLoader = async () => {
    return getPosts()
}