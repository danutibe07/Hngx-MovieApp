import React, { useEffect, useState } from "react";
import Footer from "./Home/Footer";
import Header from "./Home/Header";
import Cards from "./Home/Cards";

function HomePage() {
  const [result, searchResult] = useState([]);

  const setSearchResult = (result) => {
    searchResult(result);
  };

  return (
    <div>
      <Header searchResult={setSearchResult} />
      <Cards searchResponse={result} />
      <Footer />
    </div>
  );
}
export default HomePage;
