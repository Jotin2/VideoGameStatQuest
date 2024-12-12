import React from "react";
import LogoutButton from "../components/buttons/LogoutButton";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Homepage</h1>
                <p className="text-lg text-gray-600">Test test test!</p>
            </div>
        </div>
    );
};

export default HomePage;
