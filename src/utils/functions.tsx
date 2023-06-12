import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from './types';

export const prettierDate = (date: string) => {
    const dateFromServer = date;
    return <FormattedDate date={new Date(dateFromServer)} />
}

export const totalPrice = (arr: TIngredient[]): number => {
    return arr ?
        arr.reduce((sum: number, item: TIngredient) => sum + item.price, 0)
        :
        0
}