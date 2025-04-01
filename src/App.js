import React, { createContext, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Background from "./components/common/Background";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/Profile";
import Dashboard2 from "./pages/dashboard/Dashboard2";
import Category from "./pages/Category";
import KYC from "./components/KYC/KYC";
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
// import { BackButton, BackButtonProvider } from "./components/BackButton/BackButton";
import { BackButton,BackButtonProvider } from "./components/hooks/BackButton";
// const BackButtonContext = createContext();

// // Custom Hook to use the BackButton Context
// const useBackButton = () => {
//   return useContext(BackButtonContext);
// };

// // BackButton Component
// const BackButton = () => {
//   const { goBack } = useBackButton();

//   return <button onClick={goBack}>&larr; Back</button>;
// };

const App=()=> {
  // const navigate = useNavigate();

  // const goBack = () => {
  //   navigate(-1);
  //};
  return (
    
      <BackButtonProvider>
    <Background>
      <ToastContainer />
      <div style={{ position: "relative" }}>
          {" "}
          {/* Container for positioning */}
          <BackButton
            style={{
              position: "absolute",
              top: "15vh",
              left: "2vh",
              zIndex: "10",
            }}
          />{" "}
        <Routes>
        {/* Public (Unauthenticated) Routes */}
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
          {/* <Route path="/back" element={useBackButton}/> */}
                {/* <button onClick={goBack}>&larr; Back</button> */}

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
        <Route  path="/staking"  element={<ProtectedRoute children={<StakingPage />} />}
        />
        <Route path="/staking-summary"  element={<ProtectedRoute children={<StakingSummary />} />}
        />

        {/* PROMOTION */}
        <Route path="/reward" element={<ProtectedRoute children={<RewardPage />} />}/>
        <Route path="/welcome-bonus" element={<ProtectedRoute children={<WelcomeBonus />} />}/>
        <Route path="/phone-giveaway" element={<ProtectedRoute children={<PhoneGiveaway />} />}/>
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
        <Route  path="create-ticket" element={<ProtectedRoute children={<TicketForm />} />}
        />
        <Route path="referral" element={<ProtectedRoute children={<Referral />} />}
        />

        <Route path="/background" element={<ProtectedRoute children={<Background />} />}/>
      </Routes>
      </div>
    </Background>
    </BackButtonProvider>
  );
}

export default App;
