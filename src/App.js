import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HeaderNavbar from './Components/HeaderNavbar/HeaderNavbar';
import MainArea from './Components/MainArea/MainArea';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import NotFound from './Components/NotFound/NotFound';
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();


function App() {
  const [signedInUser, setSignedInUser] = useState({});
  const [vehicleType, setVehicleType] = useState('');

  return (
    <UserContext.Provider value={[signedInUser, setSignedInUser, vehicleType, setVehicleType]}>
      <Router>
        <div className="App container-fluid">
          <HeaderNavbar />
          <Switch>
            <Route exact path='/' component={MainArea} />
            <Route path='/blog' component={Blog} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/destination'>
              <Destination />
            </PrivateRoute>
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
