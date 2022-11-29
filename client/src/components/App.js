import styled from "styled-components";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import SearchAll from "./searchItems/SearchAll";
import Items from "./searchItems/Items";
import ItemsDetails from "./searchItems/ItemsDetails";
import GlobalStyles from "./GlobalStyles";
import {Cloudinary} from "@cloudinary/url-gen";

const App = () => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });

  return (
    <BrowserRouter>
    <GlobalStyles />
    <Header />
    <Main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchAll" element={<SearchAll/>} />
        <Route path="/searchAll/items" element={<Items />} />
        <Route path="/searchAll/items/:name" element={<ItemsDetails />} />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
    </Main>
    </BrowserRouter>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
`;

export default App;