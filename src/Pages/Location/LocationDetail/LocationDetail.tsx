import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../../Components/Card/Card";
import Loading from "../../../Components/Loading/Loading";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import Pagination from "../../../Components/Pagination/Pagination";
import StatusFilter from "../../../Components/StatusFilter/StatusFilter";
import { convertUrlsToIds } from "../../../GeneralFunction/Function";
import { GetFetchData } from "../../../Services/api";
import { RootState } from "../../../Stores/store";
import {
  CharacterDetailSchema,
  LocationResultSchema,
} from "../../../Types/type";
import "../LocationPage.scss";

const LocationDetail = () => {
  const { id } = useParams();

  const favoritesArray = useSelector(
    (state: RootState) => state.favorite.favorites
  );

  const [characterPaginationList, setCharacterPaginationList] = useState<
    CharacterDetailSchema[]
  >([]);
  const [characterList, setCharacterList] = useState<CharacterDetailSchema[]>(
    []
  );
  const [status, setStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: singleLocation,
    error,
    loading,
  } = GetFetchData<LocationResultSchema>({ url: `location/${id}` });

  const characterIdArray: number[] | undefined =
    singleLocation?.residents && convertUrlsToIds(singleLocation?.residents);

  useEffect(() => {
    if (!characterIdArray || characterIdArray?.length < 1) return;

    fetch(`https://rickandmortyapi.com/api/character/${characterIdArray}`)
      .then((response) => response.json())
      .then((data) => {
        data?.length > 1 ? setCharacterList(data) : setCharacterList([data]);
      })
      .catch((error) => console.error(error));
  }, [characterIdArray?.length]);

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

    setCurrentPage(1);

    setCharacterPaginationList(spesificFilter);
  }, [status, characterList.length, searchValue]);

  const handleClick = (item: string) => {
    setCurrentPage(1);
    setStatus(item);
  };

  return (
    <div className="locationDetail">
      <div>
        <p> {singleLocation?.name} </p>{" "}
        <div>
          <StatusFilter
            handleClick={handleClick}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            type={"location"}
            status={status}
          />
        </div>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div className="cardDesign">
              {characterPaginationList
                ?.slice((currentPage - 1) * 18, currentPage * 18)
                .map((item) => (
                  <Card
                    favoritesArray={favoritesArray}
                    types={2}
                    value={item}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {characterPaginationList.length > 0 && (
        <div
          style={{
            position: "sticky",
            bottom: "0px",
          }}
        >
          <Pagination
            current={currentPage}
            totalPage={Math.ceil(characterPaginationList.length / 18)}
            changePage={changePage}
          />
        </div>
      )}
      {characterPaginationList.length < 1 && !loading && <NoRecord />}
    </div>
  );
};

export default LocationDetail;
