import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FrontApp from './App';
import DetailsEvent from './components/details';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FrontApp/>}/>
        <Route path='events/:eventId' element={<DetailsEvent/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
)