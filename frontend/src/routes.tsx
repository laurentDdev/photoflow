import {Navigate, createBrowserRouter} from "react-router-dom"
import App from "./App.tsx";
import {lazy} from "react";
import {rootLoader} from "./loaders/rootLoader.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {homeLoader} from "./loaders/homeLoader.ts";
import AuthPage from "./pages/auth/AuthPage.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage/RegisterPage.tsx"))
// eslint-disable-next-line react-refresh/only-export-components
const LoginPage = lazy(() => import("./pages/auth/LoginPage/LoginPage.tsx"))
// eslint-disable-next-line react-refresh/only-export-components
const HomePage = lazy(() => import("./pages/home/HomePage.tsx"))

// eslint-disable-next-line react-refresh/only-export-components
const PhotosPage = lazy(() => import("./pages/home/pages/PhotoPage/PhotoPage.tsx"))
// eslint-disable-next-line react-refresh/only-export-components
const FavPage = lazy(() => import("./pages/home/pages/FavPage/FavPage.tsx"))
// eslint-disable-next-line react-refresh/only-export-components
const ProfilePage = lazy(() => import("./pages/home/pages/ProfilePage/ProfilePage.tsx"))
// eslint-disable-next-line react-refresh/only-export-components
const SettingsPage = lazy(() => import("./pages/home/pages/SettingsPage/SettingsPage.tsx"))

// eslint-disable-next-line react-refresh/only-export-components
const ProfilePageEdit = lazy(() => import("./pages/home/pages/ProfilePage/pages/ProfilePageEdit/ProfilePageEdit.tsx"))

// eslint-disable-next-line react-refresh/only-export-components
const ProfilePagePost = lazy(() => import("./pages/home/pages/ProfilePage/pages/ProfilePagePost/ProfilePagePost.tsx"))


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        loader: rootLoader,
        children: [
            {
                element: <ProtectedRoute><HomePage/></ProtectedRoute>,
                loader: homeLoader,
                errorElement: <Navigate to="/auth"/>,
                children: [
                    {
                        index: true,
                        element: <PhotosPage/>,
                    },
                    {
                        path: 'fav',
                        element: <FavPage/>,
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage/>,
                        children: [
                            {
                                index: true,
                                element: <ProfilePageEdit/>

                            },
                            {
                                path: 'posts',
                                element: <ProfilePagePost/>
                            },
                        ]
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