import React, { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from 'react-redux';
import { getIngridients } from '../../services/actions/ingredients';
import WithToggleModalBurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {

    const { ingredients, request, failed } = useSelector(store => store.ingredients);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngridients())
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <div>
                        {failed &&
                            <h1 className="text text_type_main-large m-25">Произошла ошибка при загрузке ингридиентов!</h1>
                        }
                        {request &&
                            <h1 className="text text_type_main-large m-25">Идёт загрузка ингридиентов...</h1>
                        }
                        {ingredients !== undefined &&
                            <BurgerIngredients ingredients={ingredients} />
                        }
                    </div>
                    <WithToggleModalBurgerConstructor />
                </main>
            </DndProvider>
        </div>
    )
}

export default App;
