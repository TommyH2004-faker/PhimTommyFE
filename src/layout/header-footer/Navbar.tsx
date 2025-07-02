import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

const Navbar: React.FC = () => {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const navigate = useNavigate();

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTimKiem(e.target.value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">🎬 PhimBé Cinema</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rooms">Phòng chiếu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">Phim</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tickets">Vé của tôi</Link>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            onChange={onSearchInputChange}
                            value={tuKhoaTimKiem}
                        />
                        <button className="btn btn-outline-success d-flex align-items-center" type="submit">
                            <Search className="me-1" /> Search
                        </button>
                    </form>
                    <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Đăng nhập</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Đăng ký</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;