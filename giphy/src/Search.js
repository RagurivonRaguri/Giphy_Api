import React, { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api'
import API_KEY from './config';

function Search() {
  const [text, setText] = useState("");
  const [images, setImage] = useState([]);

  const giphy = new GiphyFetch(API_KEY);
  const handleInput = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await giphy.search(text, {limit: 10});
        console.log(response);
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Search</h2>
      <form style={{ width: "300px", textAlign: "center" }} onSubmit={handleSubmit}>
        <label style={{ color: "#555" }}>Search for a gif</label>
        <input
            type='search'
            style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
            }}
            onChange={handleInput}
        />
        </form>
        {images.map((image) => (
         <img key={image.id} src={image.images.original.url} alt={image.title} />
        ))}
    </div>
  );
}

export default Search;
