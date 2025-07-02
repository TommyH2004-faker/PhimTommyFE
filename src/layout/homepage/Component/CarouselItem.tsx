import React, {useEffect, useState} from 'react';
import MovieModel from "../../../models/MovieModel";
import MovieImageModel from "../../../models/MovieImageModel";
import {lay1AnhCuaMotPhim} from "../../../api/ImageApi";

interface CarouselItemProps {
    phimMovie: MovieModel;
}

const CarouselItem: React.FC<CarouselItemProps> = ( props) => {
    const maPhim :number=props.phimMovie.id;
    const [danhSachAnh, setDanhSachAnh] = useState<MovieImageModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    useEffect(() => {
        lay1AnhCuaMotPhim(maPhim).then(
            (hinhAnhData: MovieImageModel[]) => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            (error: Error) => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [maPhim]);
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
    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].imageUrl) {
        duLieuAnh = danhSachAnh[0].imageUrl;
    }
    return (
        <div className="row align-items-center">
            <div className="col-5 text-center">
                <img src={duLieuAnh} className="float-end" style={{width: '300px'}} alt={props.phimMovie.title} />
            </div>
            <div className="col-7">
                <h5>{props.phimMovie.director}</h5>
                <p>{props.phimMovie.duration} phút</p>
                <p>{props.phimMovie.releaseDate}</p>
            </div>
        </div>
    );
}

export default CarouselItem;
