import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import data from "./utils/data";

function App() {
    //console.log(data);

    return (
        <div className="App">
            <AppHeader />
            <main style={{ display: 'flex', minHeight: 0 }}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </div>
    )
}

export default App;
