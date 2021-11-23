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
import {TLocationState} from "../../types";
import {FeedPage} from "../../pages/feed";
import {Order} from "../order/order";

export const App = () => {
    const location = useLocation<TLocationState>();
    const dispatch = useDispatch();
    const[visible,setVisible] = useState<boolean>(false);
    //const[typeModal, setTypeModal] = useState<string>('');
    //const product = useSelector((store: RootState) => store.current.cur)
    const data = useSelector((store: RootState) => store.constructors.items)
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') ? (location.state && location.state.background) : null;

    const handleOpenModal = (e?: React.MouseEvent<HTMLElement>):void => {
        if (e !== undefined && e.currentTarget.dataset.modaltype && e.currentTarget.dataset.modaltype.toString() === "Ingredients") {
            //setTypeModal("Ingredients")
            if (e.currentTarget.dataset.item !== undefined) {
                dispatch(current.actions.add(JSON.parse(e.currentTarget.dataset.item)))
            }
            setVisible(true)
        } else if (data.filter(item => item.type === "bun").length === 1) {
            var ingredients = data.map(item => item._id)
            dispatch(sendOrder(JSON.stringify({ingredients})))
            //setTypeModal("Order")
            setVisible(true)
        }

    }

    const handleCloseModal = () => {
        if (!visible) {
            history.goBack();console.log('presIngredientss')
        } else {
            setVisible(false)
            dispatch(current.actions.del())
        }
    }

    const handleKeyPress = (e) => {
        if ((visible||background) && e.key === "Escape") {
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

    //console.log(history)
    //console.log(location)
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

    const modal = <Modal handleCloseModal={handleCloseModal}><OrderDetails /></Modal>
    // const modal = (typeModal === 'Ingredients' && product !== null) ? <Modal handleCloseModal={handleCloseModal}>
    //     <IngredientDetails {...product} /></Modal> : <Modal handleCloseModal={handleCloseModal}><OrderDetails /></Modal>

    return (
        <div className={styles.app}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <DndProvider backend={HTML5Backend}>
                        <main className={styles['app-main']}>
                            <BurgerIngredients handleOpenModal={handleOpenModal} />
                            <BurgerConstructor handleOpenModal={handleOpenModal}/>
                        </main>
                    </DndProvider>
                    {visible && modal}
                </Route>
                <ProtectedRoute path={`/profile/orders/:id`}>
                    <Order />
                </ProtectedRoute>
                <Route path={`/feed/:id`}>
                    <Order />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage/>
                </Route>
                <Route path="/reset-password">
                    <ResetPasswordPage/>
                </Route>
                <ProtectedRoute path="/profile">
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path={`/ingredients/:id`}>
                    <IngredientDetails />
                </Route>
                <Route path={`/feed`} exact={true}>
                    <FeedPage/>
                </Route>
                <Route>
                    <></>
                </Route>
            </Switch>

            {/* Show the modal when a background page is set */}
            {background && <Route path="/ingredients/:id" children={<Modal handleCloseModal={handleCloseModal}>
                <IngredientDetails /></Modal>} />}
            {background && <Route path="/feed/:id" children={<Modal handleCloseModal={handleCloseModal}>
                <Order /></Modal>} />}
            {background && <ProtectedRoute path="/profile/orders/:id" children={<Modal handleCloseModal={handleCloseModal}>
                <Order /></Modal>} />}
        </div>
    )
}

export default App;