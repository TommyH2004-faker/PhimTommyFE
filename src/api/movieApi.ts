import MovieModel from "../models/MovieModel";
import {my_request} from "./Request";

interface ketQuaInterFace{
    ketQua:MovieModel[];
    tongSoTrang:number;
    tongSoPhim:number;
}
async function  layDanhSachPhim(duongDan:string):Promise<ketQuaInterFace>{
    const ketQua:MovieModel[] = [];
    const response = await my_request(duongDan);
    const tongSoPhim = response.page.totalElements;
    const tongSoTrang = response.page.totalPages;
    const responeData = response._embedded.movies;
    console.log("Dữ liệu phim:", responeData); // Kiểm tra dữ liệu
    for (const phim of responeData) {
        ketQua.push({
            id: phim.id,
            title: phim.title,
            description: phim.description,
            duration: phim.duration,
            releaseDate: phim.releaseDate,
            director: phim.director,
            posterUrl: phim.posterUrl
        });
    }
    return {ketQua: ketQua, tongSoTrang: tongSoTrang, tongSoPhim: tongSoPhim};

}
export async function layAllMovies(trangHienTai:number ): Promise<ketQuaInterFace> {
    const duongDan = `http://localhost:8080/movies?sort=id,desc&size=8&page=${trangHienTai}`;
    return layDanhSachPhim(duongDan);
}
export async function get3PhimMoiNhat(): Promise<ketQuaInterFace> {
    const duongDan = `http://localhost:8080/movies?sort=id,desc&page=0&size=3`;
    return layDanhSachPhim(duongDan);
}
export async function timKiemPhim(tuKhoaTimKiem:string,idMovie:number):Promise<ketQuaInterFace> {
    let duongDan = "http://localhost:8080/movies?sort=id,desc&size=8&page=0";
    if (tuKhoaTimKiem !== '' && idMovie === 0) {
        duongDan = `http://localhost:8080/movies/search/findMovieByDirector?director=${tuKhoaTimKiem}`;
    }else if(tuKhoaTimKiem === '' && idMovie > 0) {
        duongDan = `http://localhost:8080/movies/search/findMovieById?id=${idMovie}`;

    }else if(tuKhoaTimKiem!== '' && idMovie > 0) {
        duongDan = `http://localhost:8080/movies/search/findMovieByDirectorAndId?director=${tuKhoaTimKiem}&id=${idMovie}`;
    }
    return layDanhSachPhim(duongDan);
}
