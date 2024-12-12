import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/RegisterForm.css";

const RegisterForm: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await register(formData);
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="mb-4">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="userName">Username</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>
            <button type="submit" className="register-button">
                Register
            </button>
            <div className="mt-4 text-center">
                <h3>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </h3>
            </div>
        </form>
    );
};

export default RegisterForm;
