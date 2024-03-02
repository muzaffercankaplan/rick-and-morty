import { Provider } from "react-redux";
import RoutesPage from "./Routes/RoutesPage";
import { store } from "./Stores/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RoutesPage />
      </Provider>
    </>
  );
};

export default App;
