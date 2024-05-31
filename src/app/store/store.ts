
import {configureStore} from "@reduxjs/toolkit";
import { recomendedBondsReducer } from "../../entites/recomendedBonds";
import { authReducer } from "../../entites/auth";
import { bondsReducer } from "../../entites/bonds";
import { accountsReducer } from "../../entites/accounts";
import { bondPageReducer, orderReducer } from "../../entites/bondPage";
import { notificationsReducer } from "../../entites/notifications";
import { strategiesReducer } from "../../entites/strategies";
import { portfolioReducer } from "../../entites/portfolio";

export const store = configureStore({
    reducer: {
        recomendedBonds: recomendedBondsReducer,
        auth: authReducer,
        bonds: bondsReducer,
        accounts: accountsReducer,
        bondPage: bondPageReducer,
        order: orderReducer,
        notifications: notificationsReducer,
        strategies: strategiesReducer,
        portfolo: portfolioReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch