import React, {useEffect, useState} from 'react';
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {fetchIngredients} from "../../services/slices/ingredients";


function IngredientDetails(props) {
    const dispatch = useDispatch()
    const initState = {
        name: '',
        image_large: '',
        calories: '',
        proteins: '',
        fat: '',
        carbohydrates: '',
    }
    const [ing, setIng] = useState(initState)
    const data = useSelector((store: RootState) => store.ingredients.entities)
    const isLoading = useSelector((store: RootState) => store.ingredients.loading)
    let { id } = useParams();

    useEffect(()=>{
        dispatch(fetchIngredients())
    }, [dispatch])

    useEffect(()=>{
        data.filter(item => item._id === id).map(item =>
            setIng(item)
        )
    }, [data, id])

    if (isLoading === 'loading') {
        return null
    }

    return (
        <div>
            <header className={'mr-10 ml-10 text text_type_main-medium ' + styles.header}>
                <span>Детали ингредиента</span>
            </header>
            <section>
                <div className={styles.wrap}>
                    <img className={styles.img + " pl-4 pr-4 mb-4"} src={ing.image_large} alt={ing.name}/>
                    <span className={styles.name + " text text_type_main-medium mb-8"}>{ing.name}</span>
                    <ul className={styles.list + " mb-15"}>
                        <li className={styles.item + " text text_type_main-default text_color_inactive"}>Калории, ккал<br /><span className="text_type_digits-default">{ing.calories}</span></li>
                        <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Белки, г<br /><span className="text_type_digits-default">{ing.proteins}</span></li>
                        <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Жиры, г<br /><span className="text_type_digits-default">{ing.fat}</span></li>
                        <li className={styles.item + " text text_type_main-default text_color_inactive ml-5"}>Углеводы, г<br /><span className="text_type_digits-default">{ing.carbohydrates}</span></li>
                    </ul>
                </div>
            </section>
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
    handleCloseModal: PropTypes.func,
};

