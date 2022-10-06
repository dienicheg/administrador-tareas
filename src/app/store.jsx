import { configureStore } from "@reduxjs/toolkit";
import tareasReducer from '../features/tareas/tareasSlice'

export const store = configureStore({
  reducer: {
    tareas: tareasReducer
  }
})