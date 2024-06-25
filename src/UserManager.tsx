import { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { GlobalConstants } from "./Common/gloabl-constants";
import './UserManager.css'; // Importer le fichier CSS

const UserManager: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const uri = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (uri.includes("/logout")) {
            logout();
        }
    }, [uri]);

    function login() {
        const user = { username, password };
        axios.post(GlobalConstants.baseUrl + "token/", user)
            .then((response) => {
                localStorage.setItem("bearerToken", response.data["access"]);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 500);
            });
    }

    function logout() {
        setTimeout(() => {
            localStorage.removeItem("bearerToken");
            navigate("/");
            window.location.reload();
        }, 500);
    }

    function register() {
        const user = { username, password };
        axios.post(GlobalConstants.baseUrl + "register", user)
            .then((response) => {
                console.log(true);
                console.log(response.data["message"]);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 500);
            });
    }

    function isLogged() {
        return !!localStorage.getItem("bearerToken");
    }

    function checkWhatPageToDisplay() {
        return uri.includes("/register");
    }

    return (
        <div className="container">
            <h2>{checkWhatPageToDisplay() ? "Registration Page" : "Login Page"}</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />
            <button
                onClick={checkWhatPageToDisplay() ? register : login}
                className="btn btn-outline-success"
            >
                {checkWhatPageToDisplay() ? "Register" : "Login"}
            </button>
            {isLogged() ? (
                <div className="alert alert-success" role="alert">
                    You are logged in
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Please log in
                </div>
            )}
            {isLogged() && (
                <button onClick={logout} className="btn btn-danger">
                    Log out
                </button>
            )}
        </div>
    );
};

export default UserManager;
