import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import WithToggleModalBurgerConstructor from "../burger-constructor/burger-constructor";
import api from "../../utils/constants";

const App = () => {

    const [state, setState] = React.useState({
        ingredientsData: null,
        hasError: false,
        loading: true
    })

    React.useEffect(() => {
        const getIngredients = async () => {
            setState({ ...state, loading: true, hasError: false });
            fetch(api)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then(data => setState({ ...state, ingredientsData: data.data, loading: false }))
                .catch(err => {
                    console.log(err);
                    setState({ ...state, loading: false, hasError: true })
                })
        }

        getIngredients();
    }, [])

    const { ingredientsData, loading, hasError } = state;

    if (ingredientsData !== null) {
        return (
            <div className={styles.app}>
                <AppHeader />
                <main className={styles.main}>
                    <BurgerIngredients products={ingredientsData} />
                    <WithToggleModalBurgerConstructor products={ingredientsData} />
                </main>
            </div>
        )
    } else if (loading) {
        return (
            <div className={styles.app}>
                <AppHeader />
                <main className={styles.main}>
                    <h1 className="text text_type_main-large m-25">Идёт загрузка ингридиентов...</h1>
                </main>
            </div>
        )
    } else if (hasError) {
        return (
            <div className={styles.app}>
                <AppHeader />
                <main className={styles.main}>
                    <h1 className="text text_type_main-large m-25">Произошла ошибка при загрузке ингридиентов!</h1>
                </main>
            </div>

        )
    } else {
        return null;
    }
}

export default App;
