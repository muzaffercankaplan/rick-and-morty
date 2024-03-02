import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  clearFavorite,
  removeFavorite,
} from "../../../Stores/MyFavoriteSlice";
import { RootState } from "../../../Stores/store";

const LocationDetail = () => {
  const favoritesArray = useSelector(
    (state: RootState) => state.favorite.favorites
  );

  console.log("favoritesArray", favoritesArray);

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(addFavorite(1))}> test</button>
      <button onClick={() => dispatch(removeFavorite(1))}> test</button>
      <button onClick={() => dispatch(clearFavorite())}> clear</button>
    </div>
  );
};

export default LocationDetail;
