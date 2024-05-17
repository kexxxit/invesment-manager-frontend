
import {configureStore} from "@reduxjs/toolkit";
import { recomendedBondsReducer } from "../../entites/recomendedBonds";
import { authReducer } from "../../entites/auth";
import { bondsReducer } from "../../entites/bonds";
import { accountsReducer } from "../../entites/accounts";

export const store = configureStore({
    reducer: {
        recomendedBonds: recomendedBondsReducer,
        auth: authReducer,
        bonds: bondsReducer,
        accounts: accountsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch