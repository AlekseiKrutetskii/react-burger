import React from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-construction.module.css";
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
    return (
        <section className={`pt-25 ${styles.ingredients}`}>
            <ul className={`${styles['item-wrap']}`}>
                {props.data.map((item, index) => {
                        if (!index) {
                            return <li key={item._id} className="mb-4 pl-8" onClick={props.handleOpenModal} data-modaltype='Ingredients' data-item={JSON.stringify(item)}><ConstructorElement type="top" isLocked={true} text={item.name} price={item.price} thumbnail={item.image} /></li>
                        } else if (index === props.data.length - 1) {
                            return <li key={item._id} className="mb-4 pl-8" onClick={props.handleOpenModal} data-modaltype='Ingredients' data-item={JSON.stringify(item)}><ConstructorElement type="bottom" isLocked={true} text={item.name} price={item.price} thumbnail={item.image} /></li>
                        } else {
                            return <li key={item._id} className="mb-4" onClick={props.handleOpenModal} data-modaltype='Ingredients' data-item={JSON.stringify(item)}><DragIcon type="primary" /><ConstructorElement text={item.name} price={item.price} thumbnail={item.image} /></li>
                        }
                    })
                }
            </ul>
            <div className={`${styles.total} mt-10`}>
                <span className={`${styles['total-price']} text text_type_digits-medium mr-10`}>
                    610 <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={props.handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    data: PropTypes.array,
    handleOpenModal: PropTypes.func
};