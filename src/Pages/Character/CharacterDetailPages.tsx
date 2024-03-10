import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { convertUrlsToIds } from "../../GeneralFunction/Function";
import { GetFetchData } from "../../Services/api";
import { RootState } from "../../Stores/store";
import { CharacterDetailSchema } from "../../Types/type";
import "./CharacterDetail.scss";

const CharacterDetailPages = () => {
  const { id } = useParams();

  const [sameStatusList, setSameStatusList] = useState<CharacterDetailSchema[]>(
    []
  );
  const [sameLocationList, setSameLocationList] = useState<
    CharacterDetailSchema[]
  >([]);

  const { data: data, loading } = GetFetchData<CharacterDetailSchema>({
    url: `character/${id}`,
  });

  const favoritesArray = useSelector(
    (state: RootState) => state.favorite.favorites
  );

  const location = data?.location.url;

  const status = data?.status;

  const getSameStatusCharacter = async () => {
    await fetch(`https://rickandmortyapi.com/api/character?status=${status}`)
      .then((response) => response.json())
      .then((data) => {
        setSameStatusList(
          data.results
            .filter((item: CharacterDetailSchema) =>
              id ? item.id != +id : item
            )
            .slice(0, 9)
        );
      })
      .catch((e) => e);
  };

  const getSameLocationCharacter = async () => {
    if (!location) return;

    await fetch(location)
      .then((res) => res.json())
      .then((data) => {
        const characterList =
          data.residents.length > 0
            ? data?.residents.slice(0, 10)
            : data.residents;

        const characterIdArray: number[] | undefined =
          characterList && convertUrlsToIds(characterList);

        const checkSameCharacter =
          id &&
          characterIdArray?.filter((item) => item != +id && item).slice(0, 9);

        if (checkSameCharacter && checkSameCharacter?.length < 1) return;

        fetch(`https://rickandmortyapi.com/api/character/${checkSameCharacter}`)
          .then((response) => response.json())
          .then((data) => {
            data?.length > 1
              ? setSameLocationList(data)
              : setSameLocationList([data]);
          })
          .catch((error) => console.error(error));
      });
  };

  useEffect(() => {
    getSameStatusCharacter();
    getSameLocationCharacter();
  }, [status, location]);

  return (
    <div className="characterPage">
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className="detailCard">
          {" "}
          <img src={data?.image} />
          <div className="text">
            <div>
              {" "}
              <p>{data?.name}</p>{" "}
              <p className="status">
                <div
                  className={
                    data?.status === "Alive"
                      ? "alive"
                      : data?.status === "Dead"
                      ? "dead"
                      : "unknown"
                  }
                />
                {data?.status}
              </p>{" "}
            </div>
            <p>
              {" "}
              <span> Species : </span> {data?.species}{" "}
            </p>
            <p>
              {" "}
              <span> Location : </span> {data?.location.name}
            </p>
            <p>
              {" "}
              <span> Gender : </span> {data?.gender}
            </p>
          </div>
        </div>
      )}
      <div className="sameStatus">
        <p>
          Same Status - <span> {data?.status}</span>
        </p>
        {loading ? (
          <Loading />
        ) : (
          <div className="cardDesign">
            {sameStatusList?.map((item) => (
              <Card favoritesArray={favoritesArray} types={2} value={item} />
            ))}
          </div>
        )}
        {sameStatusList?.length < 1 && !loading && <NoRecord />}
      </div>
      <div className="sameLocation">
        <p>
          Same Location - <span> {data?.location.name} </span>
        </p>
        {loading ? (
          <Loading />
        ) : (
          <div className="cardDesign">
            {sameLocationList?.map((item) => (
              <Card favoritesArray={favoritesArray} types={2} value={item} />
            ))}
          </div>
        )}
        {sameLocationList?.length < 1 && !loading && <NoRecord />}
      </div>
    </div>
  );
};

export default CharacterDetailPages;
