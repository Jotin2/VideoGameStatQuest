import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
    return response.data;
};

export const registerUser = async (userData: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
}) => {
    const response = await axios.post(`{API_URL}/register`, userData);
    return response.data;
};

export const refreshToken = async () => {
    const response = await axios.post(`{API_URL}/refresh`, {}, { withCredentials: true });
    return response.data; // Contains new accessToken
};

export const logoutUser = async () => {
    const response = await axios.post(`{API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
};
