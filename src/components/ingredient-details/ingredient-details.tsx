import React from 'react';
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";

function IngredientDetails(props) {
    return (
        <div className={styles.wrap}>
            <img className={styles.img + " pl-4 pr-4 mb-4"} src={props.image_large} alt={props.name}/>
            <span className={styles.name + " text text_type_main-medium mb-8"}>{props.name}</span>
            <ul className={styles.list + " mb-15"}>
                <li className={styles.item + " text text_type_main-default text_color_inactive"}>Калории, ккал<br /><span className="text_type_digits-default">{props.calories}</span></li>
                <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Белки, г<br /><span className="text_type_digits-default">{props.proteins}</span></li>
                <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Жиры, г<br /><span className="text_type_digits-default">{props.fat}</span></li>
                <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Углеводы, г<br /><span className="text_type_digits-default">{props.carbohydrates}</span></li>
            </ul>
        </div>
    )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
};

