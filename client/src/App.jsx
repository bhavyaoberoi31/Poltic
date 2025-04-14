import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authThunk";

import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Reels from "./components/Reels";
import EmailConfirm from "./components/EmailConfirm";
import PasswordReset from "./components/PasswordReset";
import ForgetPassword from "./components/ForgetPassword";
import EmailConfirmation from "./components/EmailConfirmation";
import VideoPlay from "./components/VideoPlay";
import ProtectedRoute from "./components/ProtectedRoute";
import Channel from "./components/Channel";
import ClickedVideo from "./components/ClickedVideo";
import UserDashboard from "./components/UserDashboard";
import { PublicRoute } from "./components/PublicRoute";
import Subscriptions from "./components/Subscriptions";
import UserSettings from "./components/UserSettings";
import Library from "./components/Library";
import ReportedVideos from "./components/ReportedVideos";
import { Verify } from "./components/Verify";
import Profile from "./components/Profile";
import Breaking from "./components/Breaking";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <VideoPlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-subscriptions"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/breaking"
          element={
            <ProtectedRoute>
              <Breaking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-reports"
          element={
            <ProtectedRoute>
              <ReportedVideos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
         <Route
          path="/user-library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-confirmation"
          element={
            <PublicRoute>
              <EmailConfirmation />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/short/:id" element={<ClickedVideo />} />
        <Route path="/reels" element={<Reels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
