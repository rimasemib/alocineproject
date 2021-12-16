import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CartMovie from "./components/CartMovie";

const App = () => {
  const [data, setData] = useState(null);
  const url1 = "https://api-allocine.herokuapp.com/api/movies/popular";
  const url2 = "https://api-allocine.herokuapp.com/api/movies/upcoming";
  const url3 = "https://api-allocine.herokuapp.com/api/movies/top_rated";
  // piste : l'URL doit etre dans un state
  const [url, setUrl] = useState(url1);

  const fetchData = async () => {
    const response = await axios.get(url);
    setData(response.data.results);
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const urlImgPrefix = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

  return (
    <div style={{ fontSize: "30px" }}>
      HEADER ALLOCINE
      <button
        onClick={() => {
          setUrl(url1);
        }}
      >
        URL1 (POPULAR)
      </button>
      <button
        onClick={() => {
          setUrl(url2);
        }}
      >
        URL2 (upcoming)
      </button>
      <button
        onClick={() => {
          setUrl(url3);
        }}
      >
        URL3 (top rated)
      </button>
      {data
        ? data.map((film, i) => {
            return (
              <CartMovie
                title={film.original_title}
                url={urlImgPrefix + film.poster_path}
              />
            );
          })
        : "EN ATTENTE"}
    </div>
  );
};

export default App;
