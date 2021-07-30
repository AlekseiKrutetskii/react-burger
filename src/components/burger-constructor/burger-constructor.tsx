import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-construction.module.css";
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
    const[bun, setBun] = useState('');

    useEffect(()=>{
        setBun('60d3b41abdacab0026a733c6')
    }, [])

    return (
        <section className={`pt-25 ${styles.ingredients}`}>
            {props.data.filter(item => item._id === bun).map((item, index) => {
                    return <div key={item._id +'top'} className="ml-8 mb-4"><ConstructorElement type="top" isLocked={true} text={item.name + ' (верх)'} price={item.price} thumbnail={item.image} /></div>
                })
            }
            <ul className={`${styles['item-wrap']}`}>
                {props.data.filter(item => item.type !== 'bun').map((item, index) => {
                        return <li key={item._id} className="mb-4" data-modaltype='Ingredients' data-item={JSON.stringify(item)}><DragIcon type="primary" /><ConstructorElement text={item.name} price={item.price} thumbnail={item.image} /></li>
                     })
                }
            </ul>
            {props.data.filter(item => item._id === bun).map((item, index) => {
                return <div key={item._id +'bottom'} className="ml-8 mt-4"><ConstructorElement type="bottom" isLocked={true} text={item.name + ' (низ)'} price={item.price} thumbnail={item.image} /></div>
            })
            }
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