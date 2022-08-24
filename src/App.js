import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";
import Root from "./bootstrap/Root";

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
