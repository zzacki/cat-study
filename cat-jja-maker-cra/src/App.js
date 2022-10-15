import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Favorites from "./components/Favorites";
import MainCard from "./components/MainCard";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://jsonplaceholder.typicode.com/photos";

  
  const response = await fetch(
    `${OPEN_API_DOMAIN}?id=${text}`
  );
  const responseJson = await response.json();
  return `${responseJson[0].url}`;
};

const App = () => {
  const cat1 = "../resources/cat.jpg";  
  const [counter, setCounter] = React.useState(() => {          
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(cat1);
  const [favorites, setFavories] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") ||[];
  });       

  const aleadyFavorite = favorites.includes(mainCat);

  async function setInitialCat(){
    const newCat = await fetchCat("40");    
    setMainCat(newCat);
  };

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value){    
    const newCat = await fetchCat(value);
    setMainCat(newCat); 

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter); 
      return nextCounter;
    });
        
  }

  function handleHeartClick(){        
    const nextFavorites = [...favorites, mainCat];
    setFavories(nextFavorites) 
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }       

  const titleCounter = counter === null ? '' : `${counter}번째 `;
  return (    
    <div>
      <Title>{titleCounter}고양이 가라사대</Title>          
      <Form updateMainCat={updateMainCat}/>
      <MainCard src={mainCat} onHeartClick={handleHeartClick} aleadyFavorite={aleadyFavorite}/>
      <Favorites favorites={favorites}/>
    </div>
  );        
};

export default App;
