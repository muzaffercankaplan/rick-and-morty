import { GetFetchData } from "../../Services/api";
import { LocationSchema } from "../../Types/type";

const LocationPages = () => {
  const {
    data: locationData,
    error,
    loading,
  } = GetFetchData<LocationSchema>({ url: "location" });

  return <div></div>;
};

export default LocationPages;
