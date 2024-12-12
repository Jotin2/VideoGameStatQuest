import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/LoginForm.css";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <button type="submit" className="login-button">
                Login
            </button>
            <div className="mt-4 text-center">
                <h3>
                    New to Website?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </h3>
            </div>
        </form>
    );
};

export default LoginForm;
