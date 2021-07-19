import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
    const [current, setCurrent] = useState('one')

    const categorys = [
        {'id': '1', 'type':'bun', 'title':'Булки'},
        {'id': '2', 'type':'main', 'title':'Начинки'},
        {'id': '3','type':'sauce', 'title':'Соусы'}
    ]

    return (
        <section className={`pt-10 mr-8 ${styles.ingredients}`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <div style={{ display: 'flex' }} className="mb-10">
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Начинки
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Соусы
                </Tab>
            </div>
            <div className={styles.itemwrap}>
            {categorys.map(category => {return (
                <div key={category.id} className={styles.items}>
                    <p className="text text_type_main-medium mb-6">{category.title}</p>
                    <div className={`mb-10 pl-4 pr-4 ${styles.itemsubwrap}`}>
                    {props.data
                        .filter(item => category.type === item.type)
                        .map(item =>
                            <div key={item._id} className={`mb-8 ${styles.item}`}>
                                <Counter count={1} size="default" />
                                <img className="pl-4 pr-4 mb-1" src={item.image} alt=""/>
                                <span className="text text_type_digits-default mb-1 price">{item.price} <CurrencyIcon type="primary" /></span>
                                <span className="text text_type_main-default">{item.name}</span>
                            </div>
                        )
                    }
                    </div>
                </div>
                )}
            )}
            </div>
        </section>
    )
}

export default BurgerIngredients;
