

const USER_API = "/api/users/"



export const getUserNotifications = async () => {
    const response = await fetch(`${USER_API}notifications`, {
        method: "GET"
    })

    const body = await response.json()

    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de la récupération des notifications")
        }
    }
}

export const updateProfile = async (data: FormData) => {
    const response = await fetch(`${USER_API}profile`, {
        method: "PUT",
        body: data
    })

    const body = await response.json()

    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de la mise à jour du profil")
        }
    }
}
