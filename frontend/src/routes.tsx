import {Navigate, createBrowserRouter} from "react-router-dom"
import App from "./App.tsx";
import {lazy} from "react";
import {rootLoader} from "./loaders/rootLoader.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {postsLoader} from "./loaders/postsLoader.ts";

const AuthPage = lazy(() => import("./pages/auth/AuthPage.tsx"))
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage/RegisterPage.tsx"))
const LoginPage = lazy(() => import("./pages/auth/LoginPage/LoginPage.tsx"))
const HomePage = lazy(() => import("./pages/home/HomePage.tsx"))

const PhotosPage = lazy(() => import("./pages/home/pages/PhotoPage/PhotoPage.tsx"))
const FavPage = lazy(() => import("./pages/home/pages/FavPage/FavPage.tsx"))
const ProfilePage = lazy(() => import("./pages/home/pages/ProfilePage/ProfilePage.tsx"))
const SettingsPage = lazy(() => import("./pages/home/pages/SettingsPage/SettingsPage.tsx"))

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        loader: rootLoader,
        children: [
            {
                element: <ProtectedRoute><HomePage/></ProtectedRoute>,
                loader: postsLoader,
                errorElement: <Navigate to="/auth"/>,
                children: [
                    {
                        index: true,
                        element: <PhotosPage/>,
                    },
                    {
                        path: 'fav',
                        element: <FavPage/>
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage/>
                    },
                    {
                        path: 'settings',
                        element: <SettingsPage/>
                    }
                ]
            },
            {
                path: 'auth',
                element: <AuthPage/>,
                children: [
                    {
                        index: true,
                        element: <LoginPage/>
                    },
                    {
                        path: 'register',
                        element: <RegisterPage/>
                    }
                ]
            }
        ]

    }
])