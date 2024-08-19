import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/Header";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./Components/AppLayOut/AppLayOut";
import Hotels from "./Components/Hotels/Hotels";
import HotelProvider from "./Components/Context/HotelProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";

import BookmarkLayout from "./Components/Bookmark/BookmarkLayout";
import BookmarkListProvider from "./Components/Context/BookmarkListContext";
import Bookmark from "./Components/Bookmark/Bookmark";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./Components/AddNewBoormark/AddNewBookmark";
import Login from "./Components/Login/Login";
import AuthProvider from "./Components/Context/AuathProvider";
import ProtectedRout from "./Components/ProtectedRouts/ProtectedRout";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelProvider>
          <Toaster />
          <Header />

          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayOut />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>

            <Route path="/bookmark" element={<ProtectedRout><BookmarkLayout/></ProtectedRout>}>
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
