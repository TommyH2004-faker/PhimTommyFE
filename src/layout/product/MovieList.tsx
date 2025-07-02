import React, {useEffect, useState} from "react";
import MovieModel from "../../models/MovieModel";
import {layAllMovies, timKiemPhim} from "../../api/movieApi";
import {PhanTrang} from "../utils/PhanTrang";
import MovieProps from "../product/cmponents/MovieProps";

interface MovieListProps {
    tuKhoaTimKiem: string;
    idMovie:number
}
function MovieList({tuKhoaTimKiem, idMovie}: MovieListProps) {
    const [danhSachPhim, setDanhSachPhim] = useState<MovieModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoPhim, setSoPhim] = useState(0);
    useEffect(() => {
        if(tuKhoaTimKiem === '' && idMovie === 0) {
            layAllMovies(trangHienTai - 1).then(
                kq => {
                    setDanhSachPhim(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }else{
            timKiemPhim(tuKhoaTimKiem,idMovie).then(
                kq => {
                    setDanhSachPhim(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai,tuKhoaTimKiem,idMovie]);
    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    }
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }
    if(danhSachPhim.length === 0) {
        return (
            <div>
                <h1>Không tìm thấy phim nào</h1>
            </div>
        );
    }
    return (
        <div className="container">

            <div className="row mt-4 mb-4">
                {
                    danhSachPhim.map((item) => (
                            <MovieProps moviePhim={item} key={item.id} />
                        )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}
export default MovieList;