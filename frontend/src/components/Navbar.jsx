import React, { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout, isAuthInitialized } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Track loading state

    const handleLogout = async () => {
        setLoading(true); // Start loading
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className='w-full flex flex-row-reverse px-12 py-4 shadow-lg fixed z-10 bg-white '>
            {!isAuthInitialized ? (
                <div className='flex gap-6'>
                    <button className="btn-class" onClick={handleSignup}>SignUp</button>
                    <button className="btn-class" onClick={handleLogin}>LogIn</button>
                </div>
            ) : (
                <button className="btn-class flex justify-center items-center" onClick={handleLogout} disabled={loading}>
                    {loading ? (
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        "Logout"
                    )}
                </button>
            )}
        </div>
    );
};

export default Navbar;
