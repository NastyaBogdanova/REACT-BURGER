import { ingredientsReducer } from './ingredients';
import * as actions from '../../actions/ingredients';
import { firstIngredient, secondIngredient } from '../../../utils/test-data';

describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(
            {
                request: false,
                failed: false,
                ingredients: []
            }
        )
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, {
            type: actions.GET_INGREDIENTS_REQUEST,
        })
        ).toEqual(
            {
                request: true,
                failed: false,
                ingredients: []
            }
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: [firstIngredient, secondIngredient]
        })
        ).toEqual(
            {
                request: false,
                failed: false,
                ingredients: [firstIngredient, secondIngredient]
            }
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(undefined, {
                type: actions.GET_INGREDIENTS_FAILED,
            })
        ).toEqual(
            {
                failed: true,
                request: false,
                ingredients: []
            }
        )
    })
}) 