import React, {useEffect, useState} from "react";
import MovieModel from "../../models/MovieModel";
import {layAllMovies, timKiemPhim} from "../../api/movieApi";
import {PhanTrang} from "../utils/PhanTrang";
import MovieProps from "../product/cmponents/MovieProps";
import {useParams} from "react-router-dom";
import BannerCarousel from "./Component/BannerCarousel";
import Carousel from "./Component/Carousel";
import MovieList from "../product/MovieList";

interface HomePageProps {
    tuKhoaTimKiem: string;
}
function HomePage({tuKhoaTimKiem}: HomePageProps) {
   const {idMovie} = useParams();
    let idMovieNumber = 0;
    try {
        idMovieNumber = parseInt(idMovie + '');
    } catch (error) {
        idMovieNumber = 0;
        console.error('Error :', error);
    }
    if (Number.isNaN(idMovieNumber)) {
        idMovieNumber = 0;
    }
    const images=[
        "/images/Cinemas/banner1.jpg",
        "/images/Cinemas/banner2.jpg",
        "/images/Cinemas/banner3.jpg",
    ];
    return (
      <div>
          <BannerCarousel images={images}/>
          <Carousel/>
          <MovieList tuKhoaTimKiem={tuKhoaTimKiem} idMovie={idMovieNumber}/>
      </div>
    );
}
export default HomePage;