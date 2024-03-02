import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import CharacterDetailPages from "../Pages/Character/CharacterDetailPages";
import LocationDetail from "../Pages/Location/LocationDetail/LocationDetail";
import LocationPages from "../Pages/Location/LocationPages";
import MyFavorites from "../Pages/MyFavorites/MyFavorites";

const RoutesPage = () => {
  return (
    <Routes>
      <Route Component={Dashboard}>
        {/* location and location detail page */}
        <Route path="/location">
          <Route index Component={LocationPages} />
          <Route path=":locaitonId" Component={LocationDetail} />
        </Route>
        {/* location and location detail page */}

        {/* Character Detail page */}
        <Route path="/character" Component={CharacterDetailPages} />
        {/* Character Detail page */}

        {/* MyFovarite page */}
        <Route path="/favorites" Component={MyFavorites} />
        {/* MyFovarite page */}
      </Route>

      <Route path="*" element={<Navigate to="/location" />} />
    </Routes>
  );
};

export default RoutesPage;
