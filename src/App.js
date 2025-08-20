import React, { Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import "../src/assets/css/style.css";
import "../src/assets/css/media.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BalanceOverview from "./pages/BalanceOverview";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile";
import BetsHistory from "./pages/BetsHistory";
import ProfitLoss from "./pages/ProfitLoss";
import { AuthProvider } from "./context/AuthContext";
import { BetSlipProvider } from "./context/BetSlipContext";
import CurrentBets from "./pages/CurrentBets/CurrentBets";
import LoginNew from "./Auth2/Login";
import Register from "./Auth2/Registration";
import AccountStatement from "./pages/AccountStatement";
import Otp from "./Auth2/Otp";
import CreatePin from "./Auth2/CreatePin";
import HomeNew from "./pages/HomeNew";
import Deposit from "./pages/Deposit";
import WithDraw from "./pages/WithDraw";
import AfiliateLink from "./pages/AfiliateLink";
import Afiliates from "./pages/Afiliates";
import logo from "./assets/images/loader.mov";
import ReactPlayer from "react-player";
import DepositHistory from "./pages/DepositHistory";
import WithdrawHistory from "./pages/WithdrawHistory";
import Promotions from "./pages/Promotions";
import MyAccount from "./pages/MyAccount";
import ChangePassword from "./Auth2/ChangePassword";
import ForgotPassword from "./Auth2/ForgotPassword";
import Refer from "./pages/Refer";
import Turnover from "./pages/Turnover";
import Casino from "./pages/casino/Casino";
import Index from "./CustomerSupport.js/Index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <AuthProvider>
          <BetSlipProvider>
            <Outlet />
          </BetSlipProvider>
        </AuthProvider>
      }
    >
      <Route path="/" element={<HomeNew />} />
      <Route path="/pin" element={<CreatePin />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<WithDraw />} />
      <Route path="/myaccount" element={<MyAccount />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/login" element={<LoginNew />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/affilate" element={<AfiliateLink />} />
      <Route path="/affilates" element={<Afiliates />} />
      <Route path="/balance-overview" element={<BalanceOverview />} />
      <Route path="/current-bets" element={<CurrentBets />} />
      <Route path="/active-log" element={<Logs />} />
      <Route path="/my-profile" element={<Profile />} />
      <Route path="/bets-history" element={<BetsHistory />} />
      <Route path="/account-statement" element={<AccountStatement />} />
      <Route path="/profit-and-loss" element={<ProfitLoss />} />
      <Route path="/deposit-history" element={<DepositHistory />} />
      <Route path="/withdraw-history" element={<WithdrawHistory />} />
      <Route path="/refer" element={<Refer />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/turnover" element={<Turnover />} />
      <Route path="/casino" element={<Casino />} />
      <Route path="/customer-support" element={<Index/>} />

    </Route>
  )
);

const App = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  return loader ? (
    <div className="bkash-loader" style={{backgroundColor:`#000`}}>
      <video src={logo} loop autoPlay muted style={{height:`100px`}}></video> 
    </div>
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;
