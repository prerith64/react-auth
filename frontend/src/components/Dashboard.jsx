import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [text, setText] = useState("");
  const { texts, fetchText, addText, AuthInitialize } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); // Loading state for button

  // ✅ Fetch texts on component mount
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await AuthInitialize(); // Ensure authentication
      await fetchText(); // Fetch texts from backend
      setLoading(false);
    };

    initialize();
  }, []); // ✅ Empty dependency array -> Runs only on mount

  const handleAddText = async () => {
    if (!text.trim()) return; // Prevent adding empty text
    setAdding(true); // Start loading
    try {
      await addText(text);
      setText(""); // Clear input field after adding text
      await fetchText(); // Refresh texts
    } catch (error) {
      console.error("Error adding text:", error);
    } finally {
      setAdding(false); // Stop loading
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center top-[150px] relative">
        <div className="form-class">
          <input
            className="input-handle"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />

          <button
            className="btn-class flex justify-center items-center"
            onClick={handleAddText}
            disabled={adding}
          >
            {adding ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Add Text"
            )}
          </button>

          <hr />

          <ul className="flex flex-col gap-6">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              texts.map((t, i) => <li className="input-handle" key={i}>{t}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
