import { useSelector } from '../services/types/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./basic.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useNavigate, useLocation } from 'react-router-dom';

export const HomePage = () => {

    const { ingredients, request, failed } = useSelector(store => store.ingredients);

    const navigate = useNavigate();
    const location = useLocation();

    const handleCloseModal = (): void => {
        navigate("/");
    }

    return (
        <div className={styles.app}>
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
                            <BurgerIngredients />
                        }
                    </div>
                    <BurgerConstructor />
                </main>
            </DndProvider>
            {location.state?.backgroundLocation &&
                <Modal onClose={handleCloseModal} title="Детали ингредиента">
                    <IngredientDetails />
                </Modal>
            }
        </div>
    )
}
