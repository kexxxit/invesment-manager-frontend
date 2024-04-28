
import {configureStore} from "@reduxjs/toolkit";
import { recomendedBondsReducer } from "../../entites/bond";

export const store = configureStore({
    reducer: {
        recomendedBonds: recomendedBondsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch