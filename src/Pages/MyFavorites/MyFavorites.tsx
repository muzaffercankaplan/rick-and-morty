import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import NoRecord from "../../Components/NoRecord/NoRecord";
import StatusFilter from "../../Components/StatusFilter/StatusFilter";
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
  const [searchValue, setSearchValue] = useState<string>("");

  const [characterFilteredList, setCharacterFilteredList] = useState<
    CharacterDetailSchema[]
  >([]);

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

  useEffect(() => {
    const value = characterList?.filter((character) =>
      status === "All" ? character : character.status === status
    );

    const spesificFilter = value.filter((item) =>
      searchValue
        ? item.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) && item
        : item
    );

    setCharacterFilteredList(spesificFilter);
  }, [status, searchValue, characterList?.length]);

  return (
    <div style={{ paddingBottom: "20px" }}>
      {" "}
      <div>
        <StatusFilter
          list={characterFilteredList}
          handleClick={handleClick}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          type={"favorite"}
          status={status}
        />
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="cardDesign">
            {characterFilteredList?.map((item) => (
              <Card favoritesArray={favoritesArray} types={2} value={item} />
            ))}
          </div>
        )}
      </div>
      {characterFilteredList?.length < 1 && !loading && <NoRecord />}
    </div>
  );
};

export default MyFavorites;
