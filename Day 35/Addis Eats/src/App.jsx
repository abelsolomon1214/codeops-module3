import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuUnavailable from "./components/MenuUnavailable";
import CartUnavailable from "./components/CartUnavailable";
import RouteSkeleton from "./components/RouteSkeleton";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={
            <ErrorBoundary fallback={<MenuUnavailable />}>
              <Menu />
            </ErrorBoundary>
          }
        />

        <Route path="/menu/:id" element={<DishDetail />} />

        <Route
          path="/cart"
          element={
            <ErrorBoundary fallback={<CartUnavailable />}>
              <Cart />
            </ErrorBoundary>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <ErrorBoundary fallback={<RouteSkeleton />}>
                <Suspense fallback={<RouteSkeleton />}>
                  <Checkout />
                </Suspense>
              </ErrorBoundary>
            </RequireAuth>
          }
        />

        <Route
          path="/receipt"
          element={
            <RequireAuth>
              <ErrorBoundary fallback={<RouteSkeleton />}>
                <Suspense fallback={<RouteSkeleton />}>
                  <Receipt />
                </Suspense>
              </ErrorBoundary>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;