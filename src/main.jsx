import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./Components/Home"));
const Layout = lazy(() => import("./Components/Layout"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));

import UserProvider from "./Context/UserProvider";
import WishListContext from "./Context/WishListContext";
import RelatedProducts from "./Context/RelatedProducts";
import CartProvider from "./Context/CartProvider";

const Products = lazy(() => import("./Components/Products"));
const Category = lazy(() => import("./Components/Category"));
const Brands = lazy(() => import("./Components/Brands"));
const WishList = lazy(() => import("./Components/WishList"));
const ProtectedRoute = lazy(() => import("./Components/ProtectRoute"));
const NotFoundPage = lazy(() => import("./Components/NotFoundPage"));
const Cart = lazy(() => import("./Components/Cart"));
const ProductsDetails = lazy(()=>import('./Pages/ProductsDetails'))
const Order = lazy(()=>import('./Pages/Order'))
const Checkout =lazy(()=>import('./Pages/Checkout'))
const Loading =lazy(()=>import('./Pages/Loading'))

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkStatus from "./Components/NetworkStatus";
import ProductsProvider from "./Context/Products";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Category /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/brands", element: <Brands /> },
      { path: "/orders", element: <Order /> },
      { path: "/ProductDetails/:id", element: <ProductsDetails /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,

    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ProductsProvider>
      <UserProvider>
        <RelatedProducts>
          <WishListContext>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </WishListContext>
        </RelatedProducts>
      </UserProvider>
    </ProductsProvider>
    <NetworkStatus />
  </QueryClientProvider>
);
