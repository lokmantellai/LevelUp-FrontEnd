import { useAuth } from "../context/hooks";
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8000";
const TOKEN_ACCESS_KEY = "jwt-token-access";
const TOKEN_REFRESH_KEY = "jwt-token-refresh";

const useAxios = () => {
    const { token, setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const privateAxios = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${token}` }
    });
    const publicAxios = axios.create({ baseURL });

    privateAxios.interceptors.request.use(async req => {
        console.log(req.url, " this reqesut excut from private Router");
        const user = jwtDecode(token);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req;
        await refreshAccessToken(setToken, setUser, navigate);
        req.headers.Authorization = `Bearer ${localStorage.getItem("jwt-token-access")}`;
        return req;
    });

    return { privateAxios, publicAxios, baseURL };
};

const refreshAccessToken = async (setToken, setUser) => {
    try {
        const response = await axios.post(`${baseURL}/users/api/token/refresh/`, {
            refresh: localStorage.getItem(TOKEN_REFRESH_KEY)
        });
        localStorage.setItem(TOKEN_ACCESS_KEY, response.data.access);
        setToken(response.data.access);
        setUser(jwtDecode(response.data.access));
    } catch (error) {
        console.error("Error refreshing access token:", error);
    }

};

export default useAxios;
