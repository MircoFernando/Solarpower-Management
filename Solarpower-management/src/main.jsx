import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import HomePage from './pages/home/home-page'
import DashBoardPage from './pages/dashboard/dashboard-page'
import RootLayout from './Layouts/root-layout'
import { store } from "@/lib/redux/store.js"
import { Provider } from "react-redux"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
);
