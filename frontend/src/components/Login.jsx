import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center h-screen items-center ">
      <form onSubmit={handleSubmit} className="form-class text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          className="input-handle"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input-handle"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
