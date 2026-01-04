import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Home from '../Pages/Home';
import AvailableFoods from '../Pages/AvailableFoods';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import PrivateRoutes from './PrivateRoutes';
import ManageMyFoods from '../Pages/ManageMyFoods';
import MyFoodRequest from '../Pages/MyFoodRequest';
import FoodDetails from '../Pages/FoodDetails';
import AddFood from '../Pages/AddFood';
import DashboardLayout from '../Layouts/DashboardLayout';
import DashboardHome from '../Pages/DashboardHome';
import MyProfile from '../Pages/MyProfile';



export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: ([
            {
                path: '/',
                Component: Home,
                // loader: () => fetch('https://plate-share-server-xi.vercel.app/featured-foods'),
                // HydrateFallback: Loading,
                errorElement: <Error></Error>
            },
            {
                path: '/available-foods',
                Component: AvailableFoods,
                // loader: () => fetch('https://plate-share-server-xi.vercel.app/foods'),

                errorElement: <Error></Error>
            },
            {
                path: '/foods/:id',
                element: <FoodDetails></FoodDetails>,
                // loader: ({ params }) => fetch(`https://plate-share-server-xi.vercel.app/foods/${params.id}`),
                // HydrateFallback: Loading,
                errorElement: <Error></Error>
            }
        ])
    },
    {
        Component: DashboardLayout,
        path: 'dashboard',
        errorElement: <Error></Error>,
        children: ([
            {
                path: 'home',
                Component: DashboardHome,

            },
            {
                path: 'add-food',
                element:
                    <PrivateRoutes>
                        <AddFood></AddFood>
                    </PrivateRoutes>

            },
            {
                path: 'manage-my-foods',
                element:
                    <PrivateRoutes>
                        <ManageMyFoods></ManageMyFoods>
                    </PrivateRoutes>
            },
            {
                path: 'my-food-request',
                element:
                    <PrivateRoutes>
                        <MyFoodRequest></MyFoodRequest>
                    </PrivateRoutes>
            },
            {
                path: 'my-profile',
                element:
                    <PrivateRoutes>
                        <MyProfile/>
                    </PrivateRoutes>
            },
        ])
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: ([
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/signup',
                Component: SignUp
            }
        ])
    }
])
