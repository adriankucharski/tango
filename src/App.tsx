import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from './containers/Login';
import Home from './containers/Home';
import WorkBoard from './containers/WorkBoard';
import { useContext } from "react";
import { GlobalContext } from "./hooks/useGlobalContext";
import Registration from "./containers/Registration";

const App = () => {
  const { authState } = useContext(GlobalContext);
  return (
    <BrowserRouter>
      <Routes>
        {authState ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/board/:boardID/:boardName' element={<WorkBoard />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
