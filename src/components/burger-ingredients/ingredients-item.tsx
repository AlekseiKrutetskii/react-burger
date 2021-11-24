import React from 'react';
import styles from './ingredients-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from 'react-dnd';
import {useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import {useLocation, Link} from "react-router-dom";
import {TEntity} from "../../types";

type TIngredientsItemProps = {
    item: TEntity
}

const IngredientsItem:React.FC<TIngredientsItemProps> = ({item}) => {
    let location = useLocation();
    const countData = useSelector((store: RootState) => store.constructors.count)
    const itemCount  = countData.filter(i => i._id === item._id)[0];
    const count = (itemCount)?itemCount.qty:0;

    const [{ isDragging }, ref] = useDrag({
        type: 'items',
        item: item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        //<div ref={ref} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}} className={`mb-8 ${styles.item}`} onClick={props.handleOpenModal} data-modaltype='Ingredients' data-item={JSON.stringify(props.item)}>

            <div ref={ref} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}} className={`mb-8 ${styles.item}`} data-item={JSON.stringify(item)}>
                <Link className={styles.link}
                key={item._id}
                to={{
                    pathname: `/ingredients/${item._id}`,
                    // This is the trick! This link sets
                    // the `background` in location state.
                    state: { background: location }
                }}
            >
                {count > 0 && <Counter count={count} size="default" />}
                <img className="pl-4 pr-4 mb-1" src={item.image} alt={item.name}/>
                <span className="text text_type_digits-default mb-1 price">{item.price} <CurrencyIcon type="primary" /></span>
                <span className="text text_type_main-default">{item.name}</span></Link>
            </div>

    )
}

export default IngredientsItem;
