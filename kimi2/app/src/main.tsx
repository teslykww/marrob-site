import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import './index.css';
import App from './App.tsx';
import Header from './sections/Header';
import Footer from './sections/Footer';
import MessengerWidget from './components/MessengerWidget';
import CatalogPage from './pages/CatalogPage';
import DealersPage from './pages/DealersPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <MotionConfig reducedMotion="user">
      <div className="min-h-screen min-w-0 w-full max-w-[100%] overflow-x-hidden bg-bg">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/dealers" element={<DealersPage />} />
        </Routes>
        <Footer />
        <MessengerWidget />
      </div>
      </MotionConfig>
    </HashRouter>
  </StrictMode>,
)
