import {
  BrowserRouter as Router,
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
    <Router>
      <Routes>
        {authState ? (
          <>
            <Route path='/tango' element={<Home />} />
            <Route path='/tango/login' element={<Login />} />
            <Route path='/tango/board' element={<WorkBoard />} />
            <Route path='/tango/registration' element={<Registration />} />
          </>
        ) : (
          <>
            <Route path='/tango' element={<Login />} />
            <Route path='/tango/login' element={<Login />} />
            <Route path='/tango/registration' element={<Registration />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
