const post_url = "/api/posts/"

export const createPost = async (data: FormData) => {

    console.log(data)

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

            if (response.status === 401) {
                throw new Error("Session expirée")
            }

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

            if (response.status === 401) {
                throw new Error("Session expirée")
            }

            throw new Error("Erreur lors de la récupération des publications")
        }
    }
}