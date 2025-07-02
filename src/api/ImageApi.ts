import React    from "react";
import MovieImageModel from "../models/MovieImageModel";
import {my_request} from "./Request";
async function layAnhMotPhim(duongDan:string):Promise<MovieImageModel[]>{
    const ketQua:MovieImageModel[] = [];
    const response = await my_request(duongDan);
    const responseData = response._embedded.movieImages;
    for(const item in responseData) {
        ketQua.push({
         id: responseData[item].id, // id anh
            imageUrl: responseData[item].imageUrl, // duong dan anh
            isThumbnail: responseData[item].isThumbnail, // la icon
            description: responseData[item].description, // mo ta
            movie: responseData[item].movie // danh sach phim
        });
    }
    return ketQua;
}
export async function lay1AnhCuaMotPhim(idMovie:number):Promise<MovieImageModel[]>{
    const duongDan:string = `http://localhost:8080/movies/${idMovie}/listImages?sort=id,asc&page=0&size=1`;
    return layAnhMotPhim(duongDan);
}
export async function layToanBoHinhAnhMotPhim(idMovie:number):Promise<MovieImageModel[]>{
    const duongDan:string = `http://localhost:8080/api/movies/${idMovie}/listImages`;
    return layAnhMotPhim(duongDan);
}