import React, {useRef, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import IngredientsItem from "./ingredients-item";
import {TEntity} from "../../types";

export type TBurgerIngredientsProps = {
    handleOpenModal: (e: React.MouseEvent<HTMLElement>) => void
}

const BurgerIngredients:React.FC<TBurgerIngredientsProps> = ({handleOpenModal}) => {
    const data:Array<TEntity> = useSelector((store: RootState) => store.ingredients.entities)
    const [current, setCurrent] = useState('one')

    const divWrap = useRef<HTMLDivElement>(null);
    const divBun = useRef<HTMLDivElement>(null);
    const divMain = useRef<HTMLDivElement>(null);
    const divSouce = useRef<HTMLDivElement>(null);
    const offsetCorrect = (divBun.current != null ) ? divBun.current.offsetTop : 0;

    const onScroll = () => {
        const scrollTopDivWrap = (divWrap.current != null ) ? divWrap.current.scrollTop : 0;
        const offsetTopDivBun = (divBun.current != null ) ? divBun.current.offsetTop : 0;
        const offsetTopDivMain = (divMain.current != null ) ? divMain.current.offsetTop : 0;
        const offsetTopDivSouce = (divSouce.current != null ) ? divSouce.current.offsetTop : 0;

        if (Math.abs(offsetTopDivSouce-scrollTopDivWrap-offsetCorrect) < Math.abs(offsetTopDivMain-scrollTopDivWrap-offsetCorrect)) {
            setCurrent('three');
        } else if (Math.abs(offsetTopDivMain-scrollTopDivWrap-offsetCorrect) < Math.abs(offsetTopDivBun-scrollTopDivWrap-offsetCorrect)) {
            setCurrent('two');
        } else {
            setCurrent('one');
        }
    }

    return (
        <section className={`pt-10 mr-8 ${styles.ingredients}`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <div className={`mb-10 ${styles.tab}`}>
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
            <div className={styles['item-wrap']} onScroll={onScroll} ref={divWrap}>
                <div className={styles.items} ref={divBun}>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <div className={`mb-10 pl-4 pr-4 ${styles['item-subwrap']}`}>
                        {data
                            .filter(item => item.type === 'bun')
                            .map(item =>
                                <IngredientsItem key={item._id} item={item} />
                            )
                        }
                    </div>
                </div>
                <div className={styles.items} ref={divMain}>
                    <p className="text text_type_main-medium mb-6">Начинки</p>
                    <div className={`mb-10 pl-4 pr-4 ${styles['item-subwrap']}`}>
                        {data
                            .filter(item => item.type === 'main')
                            .map(item =>
                                <IngredientsItem key={item._id} item={item} />
                            )
                        }
                    </div>
                </div>
                <div className={styles.items} ref={divSouce}>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <div className={`mb-10 pl-4 pr-4 ${styles['item-subwrap']}`}>
                        {data
                            .filter(item => item.type === 'sauce')
                            .map(item =>
                                <IngredientsItem key={item._id} item={item} />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;