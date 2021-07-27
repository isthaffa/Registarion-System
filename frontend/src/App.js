import "./App.css";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes/router";
import { Provider } from "react-redux";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
