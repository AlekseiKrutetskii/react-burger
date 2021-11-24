import React, {useEffect, useState} from 'react';
import styles from './ingredient-details.module.css'
import { useParams } from "react-router-dom";
import {useSelector} from '../../services/hooks';
import {RootState} from "../../services/reducers";
import {TEntity} from "../../types";

type TRouteParams = {
    id: string;
}

const IngredientDetails:React.FC = () => {
    const [ing, setIng] = useState<TEntity>()
    const data:Array<TEntity> = useSelector((store: RootState) => store.ingredients.entities)
    const isLoading = useSelector((store: RootState) => store.ingredients.loading)
    let { id } = useParams<TRouteParams>();

    useEffect(()=>{
        data.filter(item => item._id === id).map(item =>
            setIng(item)
        )
    }, [data, id])

    if (isLoading === 'loading' || !ing) {
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

