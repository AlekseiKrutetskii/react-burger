import React from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-construction.module.css";
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function BurgerConstructor(props) {
    return (
        <section className={`pt-25 ${styles.ingredients}`}>
            <ul className={`${styles.itemwrap}`}>
                {props.data
                    .map((item, index) => {
                        if (!index) {
                            return <li key={item._id} className="mb-4"><ConstructorElement type="top" isLocked={true} text={item.name} price={item.price} thumbnail={item.image} /></li>
                        } else if (index === props.data.length - 1) {
                            return <li key={item._id} className="mb-4"><ConstructorElement type="bottom" isLocked={true} text={item.name} price={item.price} thumbnail={item.image} /></li>
                        } else {
                            return <li key={item._id} className="mb-4"><ConstructorElement text={item.name} price={item.price} thumbnail={item.image} /></li>
                        }
                    })
                }
            </ul>
            <div className={`${styles.total} mt-10`}>
                <span className="text text_type_digits-medium totalprice mr-10">
                    610 <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;

BurgerIngredients.propTypes = {
    data: PropTypes.array
};