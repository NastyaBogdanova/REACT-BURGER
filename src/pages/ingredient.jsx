import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from "../components/ingredient-details/ingredient-details.module.css";
import AppHeader from "../components/app-header/app-header";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export function IngredientPage() {

    return (
        <div className={styles.background}>
            <AppHeader />
            <div className="mt-25">
                <IngredientDetails />
            </div>

        </div>
    )
}