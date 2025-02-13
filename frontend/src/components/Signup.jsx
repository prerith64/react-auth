import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Track loading state

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading

    try {
      await signup(form);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center h-screen items-center ">
      <form onSubmit={onHandleSubmit} className="form-class text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <input
          className="input-handle"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Enter your name"
          required
        />
        <input
          className="input-handle"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Enter your email"
          required
        />
        <input
          className="input-handle"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Enter your password"
          required
        />
        <input
          className="input-handle"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          required
        />

        <button
          className="btn-class flex justify-center items-center"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
