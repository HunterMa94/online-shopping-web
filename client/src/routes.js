import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./hoc/MainLayout";
import Loader from "./utils/loader";
import AuthGuard from "./hoc/AuthGuard"

import Home from "components/Home"
import Header from "components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import RegisterLogin from "./components/Auth"
import Shop from "components/Shop";

import UserDashboard from "components/Dashboard";
import UserInfo from "./components/Dashboard/user/info";
import AdminProducts from "components/Dashboard/admin/products";
import AddProduct from "components/Dashboard/admin/products/addEdit/Add";
import EditProduct from "components/Dashboard/admin/products/addEdit/Edit";
import ProductDetial from "components/Product";
import Cart from "components/Dashboard/user/Cart";
import Site from "components/Dashboard/site";

import Verification from "components/Verification";

import { useDispatch, useSelector } from "react-redux"
import { userIsAuth, userSignOut } from "../src/store/actions/user.actions"



const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])
  // console.log(users);



  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  return (
    <div className="App">
      <BrowserRouter>
        {loading
          ?
          <Loader
            full={true}
          />
          : <>
            <Header users={users} signOutUser={signOutUser} />
            <MainLayout>
              <Routes>
                <Route path="/dashboard" exact element={<AuthGuard><UserDashboard users={users} /></AuthGuard>}></Route>
                <Route path="/dashboard/user/user_info" exact element={<AuthGuard><UserInfo users={users} /></AuthGuard>}></Route>
                <Route path="/dashboard/user/user_cart" exact element={<AuthGuard><Cart users={users} /></AuthGuard>}></Route>

                <Route path="/dashboard/admin/admin_products" exact element={<AuthGuard><AdminProducts /></AuthGuard>}></Route>
                <Route path="/dashboard/admin/add_products" exact element={<AuthGuard><AddProduct /></AuthGuard>}></Route>
                <Route path="/dashboard/admin/edit_product/:id" exact element={<AuthGuard><EditProduct /></AuthGuard>}></Route>
                <Route path="/dashboard/admin/manage_site" exact element={<AuthGuard><Site /></AuthGuard>}></Route>

                <Route path="/shop" exact element={<Shop />}></Route>

                <Route path="/product_detail/:id" exact element={<ProductDetial />}></Route>

                <Route path="/sign_in" exact element={<RegisterLogin />}></Route>
                <Route path="/" exact element={<Home />}></Route>

                <Route path="/verification?" element={<Verification />}></Route>
                {/* 暂时这样 */}
                <Route path="*" element={<Navigate to="/" />}></Route>
              </Routes>
            </MainLayout>
            <Footer />
          </>}

      </BrowserRouter>
    </div>
  );
}

export default App;
