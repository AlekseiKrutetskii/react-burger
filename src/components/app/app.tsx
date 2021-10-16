import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {current} from "../../services/slices/current";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {Switch, Route, useLocation } from 'react-router-dom';
import {ResetPasswordPage, ForgotPasswordPage, LoginPage, RegisterPage, ProfilePage } from '../../pages';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { sendOrder } from "../../services/slices/order";
import ProtectedRoute from "../protected-route/protected-route";
import {history} from "../../services/reducers";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const[visible,setVisible] = useState(false);
    const[typeModal, setTypeModal] = useState('');
    const product = useSelector((store: RootState) => store.current.cur)
    const data = useSelector((store: RootState) => store.constructors.items)
    //const isAuth = useSelector((store: RootState) => !!store.user.data)
    //const action = useSelector((store: RootState) => store.router.action)

    const handleOpenModal = (e) => {
        if (e.currentTarget.dataset.modaltype && e.currentTarget.dataset.modaltype.toString() === "Ingredients") {
            setTypeModal("Ingredients")
            dispatch(current.actions.add(JSON.parse(e.currentTarget.dataset.item)))
            setVisible(true)
        } else if (data.filter(item => item.type === "bun").length === 1) {
            var ingredients = data.map(item => item._id)
            dispatch(sendOrder(JSON.stringify({ingredients})))
            setTypeModal("Order")
            setVisible(true)
        }

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

    console.log(history)
    console.log(location)
    /*
    * / - главная страница, конструктор бургеров.
    * /login - страница авторизации.
    * /register - страница регистрации.
    * /forgot-password - страница восстановления пароля.
    * /reset-password - страница сброса пароля.
    * /profile — страница с настройками профиля пользователя.
    * /ingredients/:id — страница ингредиента.
    * 404
    *
    */

    let background = (history.action === 'PUSH' || history.action === 'REPLACE') ? (location.state && location.state.background) : null;
    const modal = (typeModal === 'Ingredients' && product !== null) ? <Modal header="Детали ингредиента" handleCloseModal={handleCloseModal}>
        <IngredientDetails {...product} /></Modal> : <Modal handleCloseModal={handleCloseModal}><OrderDetails /></Modal>

    return (
        <div>
            <Switch location={background || location}>
                <Route path="/" exact={true}>
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
                </Route>
                <Route path="/login">
                    <div className={styles.app}>
                        <AppHeader />
                        <LoginPage />
                    </div>
                </Route>
                <Route path="/register">
                    <div className={styles.app}>
                        <AppHeader />
                        <RegisterPage/>
                    </div>
                </Route>
                <Route path="/forgot-password">
                    <div className={styles.app}>
                        <AppHeader />
                        <ForgotPasswordPage/>
                    </div>
                </Route>
                <Route path="/reset-password">
                    <div className={styles.app}>
                        <AppHeader />
                        <ResetPasswordPage/>
                    </div>
                </Route>
                <ProtectedRoute path="/profile">
                    <div className={styles.app}>
                        <AppHeader />
                        <ProfilePage/>
                    </div>
                </ProtectedRoute>
                <Route path={`/ingredients/:id`}>
                    <div className={styles.app}>
                        <AppHeader />
                        <IngredientDetails />
                    </div>
                </Route>
                <Route>
                    <></>
                </Route>
            </Switch>

            {/* Show the modal when a background page is set */}
            {background && <Route path="/ingredients/:id" children={<Modal header="Детали ингредиента" handleCloseModal={handleCloseModal}>
                <IngredientDetails handleCloseModal={handleCloseModal} {...product} /></Modal>} />}
        </div>
    )
}

export default App;
