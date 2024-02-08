import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
