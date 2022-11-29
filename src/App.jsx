import React from "react";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import data from './components/utils/data';


function App() {
    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <BurgerIngredients products={data} />
                <BurgerConstructor products={data} />
            </main>
        </div>
    );
}

export default App;
