import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./layout/header-footer/Navbar";
import {BrowserRouter} from "react-router-dom";

import Carousel from "./layout/homepage/Component/Carousel";
import CarouselItem from "./layout/homepage/Component/CarouselItem";
import HomePage from "./layout/homepage/HomePage";

function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] =useState("");
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
            <HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>
            </BrowserRouter>
        </div>
    );
}

export default App;