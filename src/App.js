import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import "./App.css";
/*
Details:-

• Created a webpage to search about the breaking bad cast.

• Rendered all the characters if the search field is empty.

• Used pagination to organize the number of characters on one page.

• On Hover over each page spinned the image and showed some details about the character.

• On click on each character, wiki link about the character bio will open.

*/
const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      //using axios to make http request,axios return promise,instead of using then ,use async and wait
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );

      console.log(result.data);

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, [query]); //query is a dependency,whenever query changes this function will be executed

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
};

export default App;
