import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './layout/homepage/HomePage';


function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

    return (
        <BrowserRouter>
            <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
            <Routes>
                <Route path="/" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path="/movies/:idMovie" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
