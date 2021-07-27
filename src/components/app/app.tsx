import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from "../../utils/data";

function App() {
    //console.log(data);

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.appmain}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </div>
    )
}

export default App;
