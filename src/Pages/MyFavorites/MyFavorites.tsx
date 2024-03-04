import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { clearFavorite } from "../../Stores/MyFavoriteSlice";
import { RootState } from "../../Stores/store";
import { CharacterDetailSchema } from "../../Types/type";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [characterList, setCharacterList] = useState<CharacterDetailSchema[]>(
    []
  );
  const [status, setStatus] = useState<string>("All");
  const [loading, setLodaing] = useState(false);

  const statusFilterArray: string[] = [
    "All",
    "Alive",
    "Dead",
    "unknown",
    "clear favorite list",
  ];

  const favoritesArray = useSelector(
    (state: RootState) => state.favorite.favorites
  );

  const handleClick = (label: string) => {
    if (label === "clear favorite list") {
      dispatch(clearFavorite());
      navigate("/location");
    } else {
      setStatus(label);
    }
  };

  useEffect(() => {
    if (favoritesArray?.length < 1) {
      setCharacterList([]);
      return;
    }
    setLodaing(true);
    fetch(`https://rickandmortyapi.com/api/character/${favoritesArray}`)
      .then((response) => response.json())
      .then((data) => {
        data?.length > 1 ? setCharacterList(data) : setCharacterList([data]);
        setLodaing(false);
      })
      .catch((error) => setLodaing(false));
  }, [favoritesArray?.length]);

  return (
    <div>
      {" "}
      <div>
        {statusFilterArray.map((item) =>
          characterList.length > 0 || item !== "clear favorite list" ? (
            <button
              className="statusFilter"
              onClick={() => handleClick(item)}
              key={item}
            >
              {" "}
              {item}{" "}
            </button>
          ) : (
            ""
          )
        )}
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="cardDesign">
            {characterList
              ?.filter((character) =>
                status === "All" ? character : character.status === status
              )
              .map((item) => (
                <Card favoritesArray={favoritesArray} types={2} value={item} />
              ))}
          </div>
        )}
        {/* {characterList
          ?.filter((character) =>
            status === "All" ? character : character.status === status
          )
          .map((item) => (
            <Card favoritesArray={favoritesArray} types={2} value={item} />
          ))} */}
      </div>
      {characterList?.filter((character) =>
        status === "All" ? character : character.status === status
      ).length < 1 &&
        !loading && <NoRecord />}
    </div>
  );
};

export default MyFavorites;
