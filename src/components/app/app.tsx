import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
    const[data, setData] = useState([]);
    const[visible,setVisible] = useState(false);
    const[typeModal, setTypeModal] = useState('');
    const[product, setProduct] = useState({});
    const api = 'https://norma.nomoreparties.space/api/ingredients';

    const handleOpenModal = (e) => {
        if (e.currentTarget.dataset.modaltype && e.currentTarget.dataset.modaltype.toString() === "Ingredients") {
            setTypeModal("Ingredients")
            setProduct(JSON.parse(e.currentTarget.dataset.item))
        } else {
            setTypeModal("Order")
        }
        //setTypeModal((e.currentTarget.value == 'submit')?'setTypeModal':'Ingredients')
        //console.log(e.currentTarget.dataset.modaltype); // should return Tagvalue
        //console.log(e.target.attributes.getNamedItem('data-modaltype'))
        setVisible(true)
    }

    const handleCloseModal = () => {
        setVisible(false)
    }

    useEffect(() => {
            fetch(api)
                .then((response) => {
                    if (!response.ok) throw new Error()
                    else return response.json()
                })
                .then((response) => {
                    setData(response.data)
                })
                .catch((error) => {
                    console.log('error: ' + error)
                })
        },
        []
    )

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
            <main className={styles['app-main']}>
                <BurgerIngredients data={data} handleOpenModal={handleOpenModal} />
                <BurgerConstructor data={data} handleOpenModal={handleOpenModal}/>
            </main>
            {visible && modal}
        </div>
    )
}

export default App;
