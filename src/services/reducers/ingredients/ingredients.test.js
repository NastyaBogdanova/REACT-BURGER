import { ingredientsReducer, initialState } from './ingredients';
import * as actions from '../../actions/ingredients';
import { firstIngredient, secondIngredient } from '../../../utils/test-data';

describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, {
            type: actions.GET_INGREDIENTS_REQUEST,
        })
        ).toEqual(
            {
                ...initialState,
                request: true,
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
                ...initialState,
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
                ...initialState,
                failed: true,
            }
        )
    })
}) 