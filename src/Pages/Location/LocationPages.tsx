import { GetFetchData } from "../../Services/api";

const LocationPages = () => {
  const { data: data, error, loading } = GetFetchData<any>({ url: "location" });

  console.log("data", data);
  return <div></div>;
};

export default LocationPages;
