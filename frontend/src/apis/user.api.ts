

const USER_API = "https://g08.hopeheberg.fr:21100/api/users/"



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
