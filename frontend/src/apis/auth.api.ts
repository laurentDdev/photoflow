
const AUTH_API = "https://217.144.154.8:3000/api/auth"

export interface IRegisterUser {
    username: string
    email: string
    password: string
}

export interface  ILoginUser {
    email: string
    password: string
}

export const registerUser = async (newUser: IRegisterUser) => {
    const response = await fetch(`${AUTH_API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de l'inscription")
        }
    }
}

export const loginUser = async (credentials: ILoginUser) => {
    const response = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    const body = await response.json()
    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de la connexion")
        }
    }
}

export const getCurrentUser = async () => {
    const response = await fetch(`${AUTH_API}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json()
}

export const logoutUser = async () => {
    await fetch(`${AUTH_API}`, {
        method: "DELETE",
    })
}