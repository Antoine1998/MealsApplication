import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../Context";

function Seacrh() {
  const [text, setText] = useState("");

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      setSearchTerm(text);
      setText(" ");
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText(" ");
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          onChange={handleChange}
          value={text}
          type="text"
          placeholder="type favorite meal"
        />
        <button className="btn" type="submit">
          Search
        </button>
        <button
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}
        >
          Suprise Me !
        </button>
      </form>
    </header>
  );
}

export default Seacrh;
