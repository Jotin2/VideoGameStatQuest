import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/LogoutButton.module.css";

const LogoutButton: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await logout();
            navigate("/login");
        } catch (err) {
            setError("Network Error");
        }
    };

    return (
        <button onClick={handleLogout} className={styles["logout-button"]}>
            Logout
        </button>
    );
};

export default LogoutButton;
