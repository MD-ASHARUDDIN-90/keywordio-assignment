import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAd from "./pages/createAd/CreateAd";
import TextForm from "./component/form/textForm/TextForm";
import MediaForm from "./component/form/mediaForm/MediaForm";
import HomePage from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create-ad' element={<CreateAd />} />
        <Route path='/text' element={<TextForm />} />
        <Route path='/media' element={<MediaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
