import { constructorReducer } from './constructor';
import * as actions from '../../actions/constructor';
import { bun, mainIngredient, sauceIngredient } from '../../../utils/test-data';

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            {
                stuffings: [],
                bun: null,
            }
        )
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(
            constructorReducer({
                stuffings: [mainIngredient],
                bun: null,
            }, {
                type: actions.ADD_INGREDIENT,
                item: sauceIngredient
            })
        ).toEqual(
            {
                stuffings: [mainIngredient, sauceIngredient],
                bun: null,
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
                stuffings: [],
                bun: bun,
            }
        )
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(
            constructorReducer({
                stuffings: [mainIngredient, sauceIngredient],
                bun: null,
            }, {
                type: actions.DELETE_INGREDIENT,
                id: "2",
            })
        ).toEqual(
            {
                stuffings: [sauceIngredient],
                bun: null,
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
        ).toEqual(
            {
                stuffings: [],
                bun: null,
            }
        )
    })

    it('should handle UPDATE_INGREDIENTS', () => {
        expect(
            constructorReducer({
                stuffings: [mainIngredient, sauceIngredient],
                bun: null,
            }, {
                type: actions.UPDATE_INGREDIENTS,
                ingredients: [sauceIngredient, mainIngredient]
            })
        ).toEqual(
            {
                stuffings: [sauceIngredient, mainIngredient],
                bun: null,
            }
        )
    })
}) 