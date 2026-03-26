import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import SuspenseWrapper from "../../components/common/SuspenseWrapper";
import AuthLayout from "../../layouts/AuthLayout";
import MainLayout from "../../layouts/MainLayout";
import HomeLayout from "../../layouts/HomeLayout";
import NotFound from "@/components/common/NotFound";

// Lazy pages
const Login = lazy(() => import("../../pages/auth/login"));
const Register = lazy(() => import("../../pages/auth/register"));

const Home = lazy(() => import("../../pages/home"));
const Store = lazy(() => import("../../pages/stores"));
const Contact = lazy(() => import("../../pages/contact"));
const About = lazy(() => import("../../pages/about"));
const Policy = lazy(() => import("../../pages/policy"));
const Tc = lazy(() => import("../../pages/tc"));
const Blog = lazy(() => import("../../pages/blog/BlogList"));
const BlogDetails = lazy(() => import("../../pages/blog/BlogDetails"));
const VendorList = lazy(() => import("../../pages/vendor/vendorList"));
const VendorGrid = lazy(() => import("../../pages/vendor/VendorGrid"));
const VendorDetails = lazy(() => import("../../pages/vendor/VendorDetails"));
const WishListPage = lazy(() => import("../../features/wishlist/WishlistPage"));
const PopularProducts = lazy(() => import("../../pages/shop/PopularProducts"));
const CartPage = lazy(() => import("../../features/cart/CartPage"));
const NewProduct = lazy(() => import("../../pages/shop/NewProducts"));
const Account = lazy(() => import("../../pages/account"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseWrapper />}>
      <Routes>

          {/* Public */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedRoute />}>

            {/* HOME ONLY */}
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
            </Route>

            {/* OTHER PAGES */}
            <Route element={<MainLayout />}>
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/vendor-list" element={<VendorList />} />
              <Route path="/vendor-grid" element={<VendorGrid />} />
              <Route path="/vendor-details" element={<VendorDetails />} />
              <Route path="/tc" element={<Tc />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-details" element={<BlogDetails />} />
              <Route path="/wishlist" element={<WishListPage />} />
              <Route path="/popular-product" element={<PopularProducts />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<Account />} />

              <Route path="*" element={<NotFound />} />
            </Route>

          </Route>

        </Routes>
    </Suspense>
  );
}