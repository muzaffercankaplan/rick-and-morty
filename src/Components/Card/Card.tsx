import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../Stores/MyFavoriteSlice";
import { CharacterDetailSchema, LocationResultSchema } from "../../Types/type";
import "./Card.scss";

type Props = {
  value: LocationResultSchema | CharacterDetailSchema;
  types?: number;
  favoritesArray?: number[];
};

const Card = ({ value, types = 1, favoritesArray }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link
        to={`/${types === 1 ? "location" : "character"}/${value.id}`}
        className="name"
      >
        <span>Name:</span> {value.name || "-"}{" "}
      </Link>
      {types === 1 ? (
        <>
          <div className="type">
            {" "}
            <span>Type:</span>
            {value.type || "-"}{" "}
          </div>
          <div className="type">
            {" "}
            <span>Dimension:</span> {value.dimension || "-"}{" "}
          </div>
          <div className="type">
            {" "}
            <span>Resident:</span> {value.residents?.length || "-"}{" "}
          </div>
        </>
      ) : (
        <>
          <div className="type">
            {" "}
            <span>Status:</span> {value.status || "-"}{" "}
          </div>
          <div className="isFavorite">
            {" "}
            {favoritesArray && favoritesArray.indexOf(value.id) >= 0 ? (
              <button onClick={() => dispatch(removeFavorite(value.id))}>
                {" "}
                <MdFavorite color="red" size={20} />
              </button>
            ) : (
              <button onClick={() => dispatch(addFavorite(value.id))}>
                {" "}
                <MdFavoriteBorder size={20} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
