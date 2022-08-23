import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";
import Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;
