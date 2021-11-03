import React from 'react';
import styles from './ingredients-item.module.css';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from 'react-dnd';
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {useLocation, Link} from "react-router-dom";

function IngredientsItem(props) {
    let location = useLocation();
    const countData = useSelector((store: RootState) => store.constructors.count)
    const itemCount  = countData.filter(item => item._id === props.item._id).map(item => item.qty);

    const [{ isDragging }, ref] = useDrag({
        type: 'items',
        item: props.item,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        //<div ref={ref} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}} className={`mb-8 ${styles.item}`} onClick={props.handleOpenModal} data-modaltype='Ingredients' data-item={JSON.stringify(props.item)}>

            <div ref={ref} style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}} className={`mb-8 ${styles.item}`} data-item={JSON.stringify(props.item)}>
                <Link className={styles.link}
                key={props.item._id}
                to={{
                    pathname: `/ingredients/${props.item._id}`,
                    // This is the trick! This link sets
                    // the `background` in location state.
                    state: { background: location }
                }}
            >
                {itemCount > 0 && <Counter count={itemCount} size="default" />}
                <img className="pl-4 pr-4 mb-1" src={props.item.image} alt={props.item.name}/>
                <span className="text text_type_digits-default mb-1 price">{props.item.price} <CurrencyIcon type="primary" /></span>
                <span className="text text_type_main-default">{props.item.name}</span></Link>
            </div>

    )
}

export default IngredientsItem;

IngredientsItem.propTypes = {
    handleOpenModal: PropTypes.func,
    item: PropTypes.any
};
