import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import HomePage from "./pages/home/home-page";
import DashBoardPage from "./pages/dashboard/dashboard-page";
import RootLayout from "./Layouts/root-layout";
import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import { MainLayout } from "./Layouts/main-layout";
import { DashboardLayout } from "./Layouts/dashboard-layout";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import { ProtectedLayout } from "./Layouts/Protectedlayout.jsx";
import AuthorizedLayout from "./pages/admin/authorized.jsx";
import AdminPage from "./pages/admin/admin.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashBoardPage />} />
                </Route>
                <Route element={<AuthorizedLayout />}>
                  <Route path="/admin/dashboard" element={<AdminPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
