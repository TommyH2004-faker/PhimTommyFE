import React, {useEffect, useState} from "react";
import MovieModel from "../../../models/MovieModel";
import {Link} from "react-router-dom";
import CarouselItem from "./CarouselItem";
import {get3PhimMoiNhat} from "../../../api/movieApi";

const Carousel: React.FC = () => {
    const [danhsachPhim, setDanhSachPhim] = useState<MovieModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    useEffect(() => {
        get3PhimMoiNhat().then(
            kq => {
                setDanhSachPhim(kq.ketQua);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, []);
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
                <h1>Gặp lỗi carousel: {baoLoi}</h1>
            </div>
        );
    }
    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <Link to={`/movies/${danhsachPhim[0].id}`}>
                            <CarouselItem phimMovie={danhsachPhim[0]} />
                        </Link>
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <Link to={`/movies/${danhsachPhim[1].id}`}>
                            <CarouselItem phimMovie={danhsachPhim[1]} />
                        </Link>

                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <Link to={`/movies/${danhsachPhim[2].id}`}>
                            <CarouselItem phimMovie={danhsachPhim[2]} />
                        </Link>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
export default Carousel;