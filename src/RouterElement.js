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
import Payment from "./component/payment/Payment";
import Identify from "./component/accout/identify/Identify";
import { useContext } from "react";
import { AppContext } from "./privateRouter/PrivateRouter";
import LayoutProduct from "./component/product-Category/LayoutProduct/LayoutProduct";

function ProtectRoute() {
  const {checkPrivate} = useContext(AppContext)
  return checkPrivate ? <Outlet /> : <Navigate to = "/login" />
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
                }
              ]
            },
            {
              path: 'identify',
              element: <Identify/>
            },
            {
              path: 'collection',
              element: <Collection/>
            },
            {
              path: 'detail',
              element: <DetailProduct/>
            },
            {
              path: 'cart',
              element: <Cart/>
            },
            {
              path: 'payment',
              element: <Payment/>
            },
            {
              path: 'productCategory',
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