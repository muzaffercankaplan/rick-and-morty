import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { GetFetchData } from "../../Services/api";
import { CharacterDetailSchema } from "../../Types/type";
import "./CharacterDetail.scss";

const CharacterDetailPages = () => {
  const { id } = useParams();

  const {
    data: data,
    error,
    loading,
  } = GetFetchData<CharacterDetailSchema>({ url: `character/${id}` });

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
      )}{" "}
    </div>
  );
};

export default CharacterDetailPages;
