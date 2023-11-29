import { useSelector } from '../services/types/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./basic.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useNavigate, useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

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
                <main className={`${styles.main} p-4`}>
                    <div>
                        {failed &&
                            <h1 className="text text_type_main-medium m-25">Произошла ошибка при загрузке ингредиентов!</h1>
                        }
                        {request &&
                            <div className={`${styles.loading} mt-10`}>
                                <h1 className="text text_type_main-medium mb-4">Идёт загрузка ингредиентов...</h1>
                                <Oval
                                    height={50}
                                    width={50}
                                    color="#4c4cff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#801ab3"
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}

                                />
                            </div>
                        }
                        {ingredients !== undefined && !failed &&
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
