const post_url = "/api/posts/"

export const createPost = async (data: FormData) => {

    const response = await fetch(post_url, {
        method: "POST",
        body: data
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de la création de la publication")
        }
    }
}

export const getPosts = async () => {
    const response = await fetch(post_url, {
        method: "GET"
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {


            throw new Error("Erreur lors de la récupération des publications")
        }
    }
}

export const likePost = async (postId: string) => {
    const response = await fetch(post_url + postId + "/like", {
        method: "POST"
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {

            throw new Error("Erreur lors de la mise à jour de la publication")
        }
    }
}

export const favoritePost = async (postId: string) => {
    const response = await fetch(post_url + postId + "/favorite", {
        method: "POST"
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {

            throw new Error("Erreur lors de la mise à jour de la publication")
        }
    }
}