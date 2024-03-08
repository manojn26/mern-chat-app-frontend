import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className='main-app'>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
