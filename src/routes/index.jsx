import Home from "../pages/User/Home/Home";
import Delivery from "../pages/User/Delivery/Delivery";
import About from "../pages/User/About/About";
import Contacs from "../pages/User/Contacts/Contacs";
import HomeAdmin from "../pages/Admin/Home/HomeAdmin";
import Brand from "../pages/Admin/Brand/Brand";
import Product from "../pages/Admin/Product/Product";
import Order from "../pages/Admin/Order/Order";
import Chat from "../pages/Admin/Chat/Chat";
import User from "../pages/Admin/User/User";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail";
import Register from "../pages/User/Auth/Register/Register";
import Login from "../pages/User/Auth/Login/Login";
import CreateProduct from "../pages/Admin/Product/ActionProducts/Create/Create";
import UpdateProduct from "../pages/Admin/Product/ActionProducts/Update/Update";
import DeleteProduct from "../pages/Admin/Product/ActionProducts/Delete/Delete";
import Catalog from "../pages/User/Catalog/Catalog";
import Payment from "../pages/User/Payment/Payment";
import Cart from "../pages/User/Cart/Cart";
import CartDetail from "../pages/User/CartDetail/CartDetail";
import OrderDetail from "../pages/Admin/OrderDetail/OrderDetail";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:category/:page/:sort?",
    component: Catalog,
  },
  {
    path: "/delivery",
    component: Delivery,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contacts",
    component: Contacs,
  },
  {
    path: "/catalog/product/:slug",
    component: ProductDetail,
  },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/:id?/payment", component: Payment },
  { path: "/:id?/cart", component: Cart },
  { path: "/:id?/detail", component: CartDetail },
];
const adminRoutes = [
  { path: "/admin/home", component: HomeAdmin },
  { path: "/admin/brand", component: Brand },
  { path: "/admin/products/:catalog/:page?", component: Product },
  { path: "/admin/order/:page?", component: Order },
  { path: "/admin/chat", component: Chat },
  { path: "/admin/user", component: User },
  { path: "/admin/product/create", component: CreateProduct },
  { path: "/admin/product/:id/edit", component: UpdateProduct },
  { path: "/admin/product/:id/delete", component: DeleteProduct },
  { path: "/admin/order/detail/:id", component: OrderDetail },
];
const privateRoutes = [{}];
export { privateRoutes, publicRoutes, adminRoutes };
