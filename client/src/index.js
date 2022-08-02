import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';

import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthContextProvider>
      <SearchContextProvider>
        <Routes>
        <Route path='/*' element={<App/>}/>
        </Routes>
      </SearchContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
);
// ,
  // "proxy": "http://localhost:8800/api"
