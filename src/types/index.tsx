import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {Location} from "history";

export type TPassword = {
    type?: 'text' | 'email' | 'password';
    icon?: keyof TICons;
}

export type TEntity = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
}

export type TItem = {
    handleCloseModal: () => void,
    customId: string,
} & TEntity

export type TLocationState = {
    background: Location
}