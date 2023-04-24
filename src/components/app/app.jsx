import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngridients } from '../../services/actions/ingredients';

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
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </div>
    )
}

export default App;
