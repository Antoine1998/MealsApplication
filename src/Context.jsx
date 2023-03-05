import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Meals from "./Components/Meals";

const AppContext = React.createContext();

const allMealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

//store favorites array in the local storage to access it after refreshing
const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')
    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
        favorites = []
    }
    return favorites
}

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Setting up the faviourite component and functions to add and remove meals
  const [favorites, setFavoites] = useState(getFavoritesFromLocalStorage());

  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal)

    const alreadyFavorite = favorites.find((meal) => meal.idMeal == idMeal)
        if (alreadyFavorite) return
        
        const updatedFavorites = [...favorites, meal];
        setFavoites(updatedFavorites);
        //add it to local storage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = (idMeal) => {
    
        const updatedFavorites = (favorites.filter((meal) => meal.idMeal !== idMeal))
        setFavoites(updatedFavorites);
        // remove a meal from local storage by updating the local storage (after removing the meal)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

  }

  // Modal related functions
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
        meal = favorites.find((meal) => meal.idMeal === idMeal);
    }
    else {
        meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Accept a URL then Access the data
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
