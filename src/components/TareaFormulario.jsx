import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import Alerta from "./Alerta"
import { agregarTarea, editarTarea } from '../features/tareas/tareasSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuid } from 'uuid';

function TareaFormulario() {

    const [ alerta, setAlerta ] = useState(false)
    const [ tarea, setTarea ] = useState({
        titulo: "",
        descripcion: "",
        pendiente: true,
        id: null
    }) 
    const tareas = useSelector(state => state.tareas)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const handleCambios = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(Object.values(tarea).includes('')){
            setAlerta(true)
            return
        }
        if(params.id){
          //Editando...
          dispatch(editarTarea(tarea))   
        } else {
          //Agregando...
          dispatch(agregarTarea({
            ...tarea,
            id: uuid()
          }))
        }
        setAlerta(false)
        navigate('/')
    }

    useEffect(() => {
      if(params.id){
        setTarea(
          tareas.find(tarea => tarea.id === params.id)
        )
      }
    }, [params.id, tareas])
  return (
    <form 
        className='bg-zinc-700 w-full mx-5 md:w-1/2 p-4 mt-4 mb-8 rounded-lg flex-col'
        onSubmit={handleSubmit}
    >
        {alerta && <Alerta/>}
      <label htmlFor="titulo" className="block text-xl font-bold mb-1">Titulo:</label>
      <input 
        id="titulo"
        type="text" 
        name='titulo' 
        placeholder="Ingrese título" 
        className='w-full rounded-md bg-zinc-600 py-3'
        onChange={handleCambios}
        value={tarea.titulo}
      />
      <label htmlFor="desc" className="block text-xl font-bold mt-5 mb-1">Descripción:</label>
      <textarea 
        id="desc"
        name="descripcion" 
        placeholder="Ingrese descripción"
        className='w-full rounded-md bg-zinc-600 mb-5 py-3'
        onChange={handleCambios}
        value={tarea.descripcion}
      ></textarea>
      <div className="flex justify-between">
        <button type='submit' className="bg-indigo-600 py-1 px-2 rounded-md">Guardar Cambios</button>
        <Link 
        to={'/'}
        className='bg-red-500 px-2 text-lg py-1 rounded-md'
      >Cancelar</Link>
      </div>
    </form>
  )
}

export default TareaFormulario