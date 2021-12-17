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
  const [page, setPage] = useState(1);
  const [selMovie, setSelMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url + "?p=" + page);
      setData(response.data.results);
    };
    fetchData();
  }, [url, page]);

  console.log("data", data);

  const urlImgPrefix = "https://image.tmdb.org/t/p/w370_and_h556_bestv2";

  return (
    <div style={{ fontSize: "30px" }}>
      HEADER ALLOCINE
      <div className="buttonsLine">
        BOUTONS URL
        <button
          onClick={() => {
            setUrl(url1);
            setPage(1);
          }}
        >
          URL1 (POPULAR)
        </button>
        <button
          onClick={() => {
            setUrl(url2);
            setPage(1);
          }}
        >
          URL2 (upcoming)
        </button>
        <button
          onClick={() => {
            setUrl(url3);
            setPage(1);
          }}
        >
          URL3 (top rated)
        </button>
      </div>
      <div className="buttonsLine">PAGE</div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        page +
      </button>
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        page -
      </button>
      {data
        ? data.map((film, i) => {
            return (
              <CartMovie
                title={film.original_title}
                url={urlImgPrefix + film.poster_path}
                actionOnclick={() => {
                  setSelMovie(i);
                }}
              />
            );
          })
        : "EN ATTENTE"}
      {selMovie !== null ? (
        <div className="modalOneMovie">
          <button
            onClick={() => {
              setSelMovie(null);
            }}
            className="deleteModale"
          >
            X
          </button>
          <h1>{data[selMovie].title}</h1>
          <div>
            <img src={urlImgPrefix + data[selMovie].backdrop_path} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
