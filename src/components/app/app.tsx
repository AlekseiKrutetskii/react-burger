import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {current} from "../../services/reducers/current";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {sendOrder} from "../../services/reducers/order";

function App() {
    const dispatch = useDispatch();
    const[visible,setVisible] = useState(false);
    const[typeModal, setTypeModal] = useState('');
    const product = useSelector((store: RootState) => store.current.cur)
    const data = useSelector((store: RootState) => store.constructors.items)

    const handleOpenModal = (e) => {
        if (e.currentTarget.dataset.modaltype && e.currentTarget.dataset.modaltype.toString() === "Ingredients") {
            setTypeModal("Ingredients")
            dispatch(current.actions.add(JSON.parse(e.currentTarget.dataset.item)))
        } else {
            var ingredients = data.map(item => item._id)
            dispatch(sendOrder(JSON.stringify({ingredients})))
            setTypeModal("Order")
        }
        setVisible(true)
    }

    const handleCloseModal = () => {
        setVisible(false)
        dispatch(current.actions.del())
    }

    const handleKeyPress = (e) => {
        if (visible && e.key === "Escape") {
             handleCloseModal()
        }
    }

    useEffect(() => {
            document.addEventListener("keydown", handleKeyPress);
            return() => {
                document.removeEventListener("keydown", handleKeyPress);
            }
        }
    )

    const modal = (typeModal === 'Ingredients' && product !== null) ? <Modal header="Детали ингредиента" handleCloseModal={handleCloseModal}>
        <IngredientDetails {...product} /></Modal> : <Modal handleCloseModal={handleCloseModal}><OrderDetails /></Modal>

    return (
        <div className={styles.app}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles['app-main']}>
                    <BurgerIngredients handleOpenModal={handleOpenModal} />
                    <BurgerConstructor handleOpenModal={handleOpenModal}/>
                </main>
            </DndProvider>
            {visible && modal}
        </div>
    )
}

export default App;
