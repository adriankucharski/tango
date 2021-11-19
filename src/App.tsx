import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";
import Login from './containers/Login';
import Home from './containers/Home';

const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
  ]);
}

const App = () => {
  return <Router>
    <AppRoutes />
  </Router>
}

export default App;
