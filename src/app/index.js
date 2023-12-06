import Basket from "./basket";
import useSelector from "../store/use-selector";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((el) => (
          <Route
            path={el.path}
            element={el.component}
            key={publicRoutes.indexOf(el)}
          />
        ))}
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default App;
