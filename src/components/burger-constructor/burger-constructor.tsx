import React, {useCallback} from 'react';
import styles from "./burger-construction.module.css";
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from '../../services/hooks';
import {history, RootState} from "../../services/reducers";
import { useDrop } from 'react-dnd';
import {constructors} from "../../services/slices/constructors";
import ConstructorItem from "./constructor-item";
import update from 'immutability-helper';
import {useLocation} from 'react-router-dom'
import {TItem} from "../../types";

export type TBurgerConstructorProps = {
    handleOpenModal: () => void
}

const BurgerConstructor:React.FC<TBurgerConstructorProps> = ({handleOpenModal}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const data = useSelector((store: RootState) => store.constructors.items)
    const amount = data.reduce(function(previousValue, currentValue, index, array) {
        return previousValue + currentValue.price * ((currentValue.type === "bun") ? 2 : 1);
    }, 0)
    const isBun = data.filter(item => item.type === "bun").length

    const [, drop] = useDrop(
        () => ({
            accept: 'items',
            drop: (item:TItem) => {
                dispatch(constructors.actions.add(item))
            }
        })
    )

    const moveConstructorItem = useCallback((dragIndex, hoverIndex) => {
        const dragConstructorItem = data[dragIndex];
        dispatch(constructors.actions.update(
            (update(data, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragConstructorItem],
                ],
            }))
        ))
    }, [data, dispatch]);


    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    return (
        <section className={`pt-25 ${styles.ingredients}`} ref={drop}>
            {
                data.filter(item => item.type === 'bun').map((item) => {
                    return (<div key={item.customId +'top'} className="ml-8 mb-4"><ConstructorElement type="top" isLocked={true} text={item.name + ' (верх)'} price={item.price} thumbnail={item.image} /></div>)
                })
            }
            <ul className={`${styles['item-wrap']}`}>
            {data.filter(item => item.type !== 'bun').map((item, index) => {
                return <ConstructorItem key={item.customId} item={item} index={index+isBun} id={item.customId} moveConstructorItem={moveConstructorItem} />
            })}
            </ul>
            {
                data.filter(item => item.type === 'bun').map((item) => {
                    return <div key={item.customId +'bottom'} className="ml-8 mt-4"><ConstructorElement type="bottom" isLocked={true} text={item.name + ' (низ)'} price={item.price} thumbnail={item.image} /></div>
                })
            }
            <div className={`${styles.total} mt-10`}>
                <span className={`${styles['total-price']} text text_type_digits-medium mr-10`}>
                    {amount} <CurrencyIcon type="primary" />
                </span>
                {
                    isAuth ? <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
                    :<Button type="primary" size="large" onClick={()=>{history.push('/login', {from: location})}}>Оформить заказ</Button>
                }
            </div>
        </section>
    )
}

export default BurgerConstructor;
