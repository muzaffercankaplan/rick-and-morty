import { useState } from "react";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import Pagination from "../../Components/Pagination/Pagination";
import { GetFetchData } from "../../Services/api";
import { LocationSchema } from "../../Types/type";
import "./LocationPage.scss";

const LocationPages = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: locationData,
    error,
    loading,
  } = GetFetchData<LocationSchema>({ url: `location?page=${currentPage}` });

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="locaitonPage">
      {loading ? (
        <Loading />
      ) : (
        <div className="cardDesign">
          {locationData?.results.map((item) => (
            <Card value={item} />
          ))}
        </div>
      )}

      <div
        style={{
          position: "sticky",
          bottom: "0px",
        }}
      >
        <Pagination
          current={currentPage}
          totalPage={7}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default LocationPages;
