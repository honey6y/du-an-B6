import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider
} from "react-router-dom";
import App from "./App";
import Home from "./component/homepage/Home";
import DetailProduct from './component/detail-product/DetailProduct';
import Collection from "./component/collection/Collection";
import Login from "./component/accout/login/Login";
import Register from "./component/accout/register/Register";
import Cart from "./component/cart/Cart";
import Identify from "./component/accout/identify/Identify";
import { useContext } from "react";
import { AppContext } from "./privateRouter/PrivateRouter";
import LayoutProduct from "./component/product-Category/LayoutProduct/LayoutProduct";
import Profile from "./component/accout/inforUser/pages/profile/Profile";
import Userlayout from "./component/accout/inforUser/layouts/Userlayout/Userlayout";
import ChangePassword from "./component/accout/inforUser/pages/changePassword/ChangePassword";
import OrderHistory from "./component/accout/inforUser/pages/orderHistory/OrderHistory";
import PaymentPage from "./component/payment/PaymentPage";
import { useSelector } from "react-redux";


function ProtectRoute() {
  const isLoged = useSelector(state => state.cart.isLoged)
  const checkSecurityToLS = Boolean(localStorage.getItem('profile'))
  return (isLoged || checkSecurityToLS) ? <Outlet /> : <Navigate to = "/login" />
}  
function RejectedRoute() {
  const {checkPrivate} = useContext(AppContext)
  return !checkPrivate ? <Outlet /> : <Navigate to = "/" />
}  


function RouterElement () {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          children: [
            {
                path: '',
                element: <Home></Home>,
            },
            {
              path: '',
              element: <RejectedRoute />,
              children: [
                {
                  path: 'login',
                  element: <Login/>
                },
                {
                  path: 'register',
                  element: <Register/>
                },
                {
                  path: 'identify',
                  element: <Identify/>
                },
              ]
            },
            {
              path: '',
              element: <ProtectRoute />,
              children: [
                {
                  path: '',
                  element: <Userlayout />,
                  children: [
                    {
                      path: 'user/profile',
                      element: (
                        <Profile />
                      )
                    },
                    {
                      path: 'user/change-password',
                      element: (
                        <ChangePassword />
                      )
                    },
                    {
                      path: 'user/historyOrder',
                      element: (
                        <OrderHistory />
                      )
                    }
                  ]
                }
              ]
            },
            {
              path: 'collection',
              element: <Collection/>
            },
            {
              path: 'detail/:idProduct',
              element: <DetailProduct/>
            },
            {
              path: 'cart',
              element: <Cart/>
            },
            {
              path: 'payment',
              element: <PaymentPage/>
            },
            {
              path: 'category',
              element: <LayoutProduct />
            }
          ]
        },
      ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default RouterElement