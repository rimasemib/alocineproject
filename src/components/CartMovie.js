import "./CartMovie.css";

const CartMovie = (props) => {
  return (
    <div
      className="cartMovieContainer"
      onClick={() => {
        props.actionOnclick();
      }}
    >
      <div className="cartMovieTitle">{props.title}</div>
      <div className="cartMovieImg">
        <img src={props.url} />
      </div>
    </div>
  );
};

export default CartMovie;
