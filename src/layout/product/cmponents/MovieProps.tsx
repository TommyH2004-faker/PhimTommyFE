import React, { useEffect, useState } from "react";
import MovieModel from "../../../models/MovieModel";
import MovieImageModel from "../../../models/MovieImageModel";
import { lay1AnhCuaMotPhim } from "../../../api/ImageApi";
import { Link } from "react-router-dom";

interface MovieProps {
    moviePhim: MovieModel;
}

const MovieProps: React.FC<MovieProps> = ({ moviePhim }) => {
    const maPhim: number = moviePhim.id;
    const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
    const [danhSachAnh, setDanhSachAnh] = useState<MovieImageModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);

    useEffect(() => {
        lay1AnhCuaMotPhim(maPhim)
            .then((hinhAnhData: MovieImageModel[]) => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            })
            .catch((error: Error) => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            });
    }, [maPhim]);

    if (dangTaiDuLieu) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <div>Đang tải dữ liệu...</div>
            </div>
        );
    }
    if (baoLoi) {
        return (
            <div className="alert alert-danger text-center">
                Gặp lỗi: {baoLoi}
            </div>
        );
    }

    const duLieuAnh = danhSachAnh.length > 0 ? danhSachAnh[0].imageUrl : "https://via.placeholder.com/300x200?text=No+Image";

    function handleFavoriteMovie() {
        setIsFavoriteMovie(!isFavoriteMovie);
    }

    function handleAddProduct(moviePhim: MovieModel) {
        // Xử lý thêm vào giỏ hàng
    }

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-lg h-100 border-0 movie-card">
                <Link to={`/movies/${moviePhim.id}`} className="d-block overflow-hidden" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                    <img
                        src={duLieuAnh}
                        className="card-img-top movie-img"
                        alt={moviePhim.title}
                        style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                            transition: "transform 0.3s",
                            display: "block"
                        }}
                    />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between">
                    <Link to={`/movies/${moviePhim.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h5 className="card-title text-center fw-bold" style={{ minHeight: "48px" }}>
                            {moviePhim.title}
                        </h5>
                        <div className="text-center mb-2">
                            <span className="badge bg-primary">{moviePhim.duration} phút</span>
                        </div>
                        <h6 className="card-subtitle text-muted text-center mb-2" style={{ minHeight: "24px" }}>
                            Đạo diễn: {moviePhim.director}
                        </h6>
                        <p className="card-text text-truncate text-center" title={moviePhim.description}>
                            {moviePhim.description}
                        </p>
                    </Link>
                    <div className="d-flex justify-content-center gap-2 mt-2">
                        <button
                            className={`btn btn-sm ${isFavoriteMovie ? "btn-danger" : "btn-outline-secondary"}`}
                            onClick={handleFavoriteMovie}
                            title={isFavoriteMovie ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                        >
                            <i className={`fas fa-heart ${isFavoriteMovie ? "" : "text-muted"}`}></i>
                        </button>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleAddProduct(moviePhim)}
                            title="Thêm vào giỏ hàng"
                        >
                            <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                .movie-card:hover .movie-img {
                    transform: scale(1.05);
                }
                `}
            </style>
        </div>
    );
};

export default MovieProps;
