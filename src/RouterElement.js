import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import App from "./App";
import Home from "./component/homepage/Home";
import DetailProduct from './component/detail-product/DetailProduct';
import Collection from "./component/collection/Collection";
import Login from "./component/accout/login/Login";
import Register from "./component/accout/register/Register";
import Cart from "./component/cart/Cart";
import Payment from "./component/payment/Payment";

  


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
              path: 'login',
              element: <Login/>
            },
            {
              path: 'register',
              element: <Register/>
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
              element: <Payment/>
            }
            
          ]
        },
      ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default RouterElement