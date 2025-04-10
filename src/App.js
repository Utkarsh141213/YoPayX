import React, { createContext, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Background from "./components/common/Background";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard2 from "./pages/dashboard/Dashboard2";
import Category from "./pages/Category";
import KYC from "./pages/KYC";
import BasicDetials from "./components/KYC/BasicDetials";
import Document from "./components/KYC/Documents";
import BankDetails from "./components/KYC/BankDetails";
import MultiFactorAuth from "./components/KYC/MultiFactorAuth";
import OTP from "./components/KYC/OPT";
import TransactionPin from "./components/KYC/TransactionPin";

import AddFunds from "./pages/Funds/AddFunds";
import ConfirmAddFund from "./pages/Funds/ConfirmAddFund";
import BuyAssets from "./pages/Funds/BuyAssets";
import TransferAmountScreen from "./components/Funds/TransferAmountScreen";
import TransactionHistoryPage from "./pages/Funds/TransactionHistoryPage";
import Wallet from "./pages/Funds/Wallet";
import StakingPage from "./pages/staking/StakingPage";
import StakingSummary from "./pages/staking/StakingSummary";
import RewardPage from "./pages/Reward/RewardPage";
import WelcomeBonus from "./pages/Reward/WelcomeBonus";
import PhoneGiveaway from "./pages/Reward/PhoneGiveaway";
import NotificationCenter from "./pages/NotificationCenter";
import Ticket from "./pages/Ticket";
import TicketForm from "./components/ticket/TicketForm";
import Referral from "./pages/Referral";
import { ToastContainer } from "react-toastify";
import SellWithdrawPage from "./pages/Funds/SellWithdrawPage";
import OnboardingPages from "./pages/OnboardingPages";
import IphoneSubTask from "./pages/Reward/IphoneSubTask";
import { BackButton, BackButtonProvider } from "./components/hooks/BackButton";
import Navigation from "./components/Navigation";
import HotelSearch from "./pages/Travell/Hotel/HotelSearch";
import DisplayHotels from "./pages/Travell/Hotel/DisplayHotels";
import HotelDetails from "./pages/Travell/Hotel/HotelDetails";
import FlightSearch from "./pages/Travell/Flight/FlightSearch";
import BookHotel from "./pages/Travell/Hotel/BookHotel";
import HotelHistory from "./pages/Travell/Hotel/HotelHistory";
import ShowFlights from "./pages/Travell/Flight/ShowFlights";
const App = () => {
  const location = useLocation(); // Get the current route

  // Define routes where the Back Button should NOT be displayed
  const hiddenRoutes = ["/", "/signup", "/login", "/dashboard", "/dashboard2"];
  const hiddenRoutesNav = ["/", "/signup", "/login"];

  return (
    <BackButtonProvider>
      <Background>
        <ToastContainer />

        <div style={{ position: "relative" }}>
          <Routes>

          <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<OnboardingPages />} />


            {/* Protected (Authenticated) Routes */}
            <Route
              path="/profile"
              element={<ProtectedRoute children={<Profile />} />}
            />

            {/* Protected (Authenticated) Routes */}
            {/* <Route
              path="/profile"
              element={<ProtectedRoute children={<Profile />} />}
            /> */}

            <Route
              path="/dashboard"
              element={<ProtectedRoute children={<Dashboard2 />} />}
            />
            <Route
              path="/dashboard2"
              element={<ProtectedRoute children={<Dashboard2 />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute children={<Category />} />}
            />

            {/* KYC */}
            <Route path="/kyc" element={<ProtectedRoute children={<KYC />} />}>
              <Route path="basic-details" element={<BasicDetials />} />
              <Route path="documents" element={<Document />} />
              <Route path="bank-details" element={<BankDetails />} />
              <Route path="mfa" element={<MultiFactorAuth />} />
              <Route path="otp" element={<OTP />} />
            </Route>
            <Route
              path="/transaction-pin"
              element={<ProtectedRoute children={<TransactionPin />} />}
            />

            {/* FUNDS */}
            <Route
              path="/sell-withdraw"
              element={<ProtectedRoute children={<SellWithdrawPage />} />}
            />
            <Route
              path="/add-fund"
              element={<ProtectedRoute children={<AddFunds />} />}
            />
            <Route
              path="/confirm-add-fund"
              element={<ProtectedRoute children={<ConfirmAddFund />} />}
            />
            <Route
              path="/buy-assets"
              element={<ProtectedRoute children={<BuyAssets />} />}
            />
            <Route
              path="/transfer-fund"
              element={<ProtectedRoute children={<TransferAmountScreen />} />}
            />
            <Route
              path="/transaction-history"
              element={<ProtectedRoute children={<TransactionHistoryPage />} />}
            />
            <Route
              path="/wallet"
              element={<ProtectedRoute children={<Wallet />} />}
            />

            {/* STAKING */}
            <Route
              path="/staking"
              element={<ProtectedRoute children={<StakingPage />} />}
            />
            <Route
              path="/staking-summary"
              element={<ProtectedRoute children={<StakingSummary />} />}
            />

            {/* PROMOTION */}
            <Route
              path="/reward"
              element={<ProtectedRoute children={<RewardPage />} />}
            />
            <Route
              path="/welcome-bonus"
              element={<ProtectedRoute children={<WelcomeBonus />} />}
            />
            <Route
              path="/phone-giveaway"
              element={<ProtectedRoute children={<PhoneGiveaway />} />}
            />
            <Route path="iphone-sub-task" element={<IphoneSubTask />} />

            {/* Notifications & Tickets */}
            <Route
              path="/notifications"
              element={<ProtectedRoute children={<NotificationCenter />} />}
            />
            <Route
              path="/support"
              element={<ProtectedRoute children={<Ticket />} />}
            />
            <Route
              path="create-ticket"
              element={<ProtectedRoute children={<TicketForm />} />}
            />
            <Route
              path="referral"
              element={<ProtectedRoute children={<Referral />} />}
            />

            <Route
              path="/background"
              element={<ProtectedRoute children={<Background />} />}
            />

            {/* TRAVELL */}
            <Route
              path="/search-hotel"
              element={<ProtectedRoute children={<HotelSearch />} />}
            />
            <Route
              path="/hotels"
              element={<ProtectedRoute children={<DisplayHotels />} />}
            />
            <Route
              path="/hotel-details"
              element={<ProtectedRoute children={<HotelDetails />} />}
            />
            <Route
              path="/book-hotel"
              element={<ProtectedRoute children={<BookHotel />} />}
            />
            <Route
              path="/hotel-history"
              element={<ProtectedRoute children={<HotelHistory />} />}
            />

            <Route path="/flight-search" element={<FlightSearch />} />
            <Route path="/flights" element={<ShowFlights />} />
          </Routes>
        </div>
        {!hiddenRoutesNav.includes(location.pathname) && <Navigation />}
      </Background>
    </BackButtonProvider>
  );
};

export default App;
