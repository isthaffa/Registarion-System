import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Link ,Route,Switch} from 'react-router-dom'
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (

    <Router>
    <div className="container">
      <Switch>
      <ProtectedRoute exact path="/" component={Home} />

      <Route exact path="/login" component={Login} />
      <Route exact  path="/register" component={Registration}/>
      <Route  component={PageNotFound}/>

      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
