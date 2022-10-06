import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const tareasSlice = createSlice({
    name: "tareas",
    initialState,
    reducers: {
        agregarTarea: (state, action) => {
            state.push(action.payload)
        },
        editarTarea: ( state, action ) => {
            const {id, titulo, descripcion} = action.payload

            const tareaActualizada = state.find(tarea => tarea.id === id)

            if(tareaActualizada) {
                tareaActualizada.titulo = titulo
                tareaActualizada.descripcion = descripcion
            }
        },
        eliminarTarea: (state, action) => {
            const tareaEliminar = state.find(tarea => tarea.id === action.payload)
            if(tareaEliminar){
                state.splice(state.indexOf(tareaEliminar),1)
            }
        },
        pendienteTarea: (state, actions) => {
            const tareaActualizada = state.find(tarea => tarea.id === actions.payload.id)
            if(tareaActualizada){
                tareaActualizada.pendiente = !actions.payload.pendiente
            }
        },
        obtenerStorage: (state, actions) => {
          state.push(actions.payload)
        }
    }
})

export const { agregarTarea, eliminarTarea, editarTarea, pendienteTarea, obtenerStorage } = tareasSlice.actions
export default tareasSlice.reducer