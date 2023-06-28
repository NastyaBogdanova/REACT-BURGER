import { constructorReducer, initialState } from './constructor';
import * as actions from '../../actions/constructor';
import { bun, mainIngredient, sauceIngredient } from '../../../utils/test-data';

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(
            constructorReducer({
                ...initialState,
                stuffings: [mainIngredient],
            }, {
                type: actions.ADD_INGREDIENT,
                item: sauceIngredient
            })
        ).toEqual(
            {
                ...initialState,
                stuffings: [mainIngredient, sauceIngredient],
            }
        )
    })

    it('should handle ADD_BUN', () => {
        expect(
            constructorReducer(undefined, {
                type: actions.ADD_BUN,
                bun: bun,
            })
        ).toEqual(
            {
                ...initialState,
                bun: bun,
            }
        )
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(
            constructorReducer({
                ...initialState,
                stuffings: [mainIngredient, sauceIngredient],
            }, {
                type: actions.DELETE_INGREDIENT,
                id: "2",
            })
        ).toEqual(
            {
                ...initialState,
                stuffings: [sauceIngredient],
            }
        )
    })

    it('should handle RESET_INGREDIENTS', () => {
        expect(
            constructorReducer({
                stuffings: [mainIngredient, sauceIngredient],
                bun: bun,
            }, {
                type: actions.RESET_INGREDIENTS
            })
        ).toEqual(initialState)
    })

    it('should handle UPDATE_INGREDIENTS', () => {
        expect(
            constructorReducer({
                ...initialState,
                stuffings: [mainIngredient, sauceIngredient],
            }, {
                type: actions.UPDATE_INGREDIENTS,
                ingredients: [sauceIngredient, mainIngredient]
            })
        ).toEqual(
            {
                ...initialState,
                stuffings: [sauceIngredient, mainIngredient],
            }
        )
    })
}) 