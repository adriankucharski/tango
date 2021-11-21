import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './containers/Login';
import Home from './containers/Home';
import { useContext } from "react";
import { AuthContext } from "./hooks/useAuth";

const App = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        {authState ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
