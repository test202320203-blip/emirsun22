import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';

// 1. ИСПРАВЛЕННЫЙ ИМПОРТ: Теперь он называется правильно!
import EmirsunRegistration from './emirsun-registration.tsx'; 

// 2. НОВЫЙ ИМПОРТ: Новая страница!
import EmirsunSettings from './emirsun-settings.tsx'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ТЫ ДОЛЖЕН ИСПОЛЬЗОВАТЬ НОВЫЕ ИМЕНА! */}
        <Route path="/" element={<EmirsunRegistration />} /> 
        <Route path="/settings" element={<EmirsunSettings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);