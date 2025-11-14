import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/HomePage/Home';
import AvaialbleFoods from '../Pages/AvaialableFoods/AvaialbleFoods';
import Login from '../Pages/LoginPage/Login';
import Register from '../Pages/RegistrationPage/Register';
import MyProfile from '../Pages/Myprofile/MyProfile';
import PrivateRoutes from './PrivateRoutes';
import ManageMyFood from '../Component/ManagemyFood/ManageMyFood';
import AddFood from '../Component/AddFood/AddFood';
import MyFoodRequest from '../Component/MyFoodRquest/MyFoodRequest';
import Errorpage from '../Pages/Errorpage/Erorpage';
import AllFoods from '../Pages/AllFoods/AllFoods';

const router = createBrowserRouter([
    

    {
        //main layout
        path: '/',
        element: <MainLayout/>,
        children:[

            {
                index: true,
                element: <Home/>
            },
            {
                path:'/availablefoods',
                element: <AvaialbleFoods/>
            },
            {
                path: '/allfoods',
                element: <AllFoods/>

            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path:'/register',
                element: <Register/>
            },
            {
                path:'/myprofile',
                element: <PrivateRoutes><MyProfile/></PrivateRoutes>
            },
            {
                path:'/addfood',
                element: <PrivateRoutes>
                    <AddFood/>
                    </PrivateRoutes>
            },
            {
                path:'/managefood',
                element: <PrivateRoutes>
                    <ManageMyFood/>
                </PrivateRoutes>
            },
            {
                path:'/myfoodrequest',
                element: <PrivateRoutes>
                    <MyFoodRequest/>
                </PrivateRoutes>
            },
            

        ]
    },
    {
        path: '*',
        element: <Errorpage/>
    }

])

export default router;