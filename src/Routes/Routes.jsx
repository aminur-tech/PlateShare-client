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

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: ([
            {
                path: '/',
                Component: Home,
                loader: () => fetch('http://localhost:3000/featured-foods'),
                HydrateFallback: Loading,
                errorElement: <Error></Error>
            },
            {
                path: '/available-foods',
                Component: AvailableFoods,
                loader: () => fetch('http://localhost:3000/foods'),
                HydrateFallback: Loading,
                errorElement: <Error></Error>
            },
            {
                path: '/foods/:id',
                element:
                    <PrivateRoutes>
                        <FoodDetails></FoodDetails>
                    </PrivateRoutes>,
                loader: ({params})=>fetch(`http://localhost:3000/foods/${params.id}`),

            },
            {
                path: '/add-food',
                element:
                    <PrivateRoutes>
                        <AddFood></AddFood>
                    </PrivateRoutes>

            },
            {
                path: '/manage-my-foods',
                element:
                    <PrivateRoutes>
                        <ManageMyFoods></ManageMyFoods>
                    </PrivateRoutes>
            },
            {
                path: '/my-food-request',
                element:
                    <PrivateRoutes>
                        <MyFoodRequest></MyFoodRequest>
                    </PrivateRoutes>
            }
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
