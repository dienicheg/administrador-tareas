import { BrowserRouter, Routes, Route } from "react-router-dom";
import TareasLista from "./components/TareasLista";
import TareaFormulario from "./components/TareaFormulario";
import { obtenerStorage } from "./features/tareas/tareasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const tareas = useSelector((state) => state.tareas);

  useEffect(() => {
    const tareasLS = JSON.parse(localStorage.getItem("tareas")) ?? [];
    tareasLS.forEach((tarea) => {
      dispatch(obtenerStorage(tarea));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  return (
    <div className="min-h-screen h-100 bg-zinc-900 flex flex-col">
      <h1 className="text-5xl text-center text-white bg-zinc-900 py-5">
        Administrador de Tareas
      </h1>
      <div className=" py-10 mx-5 bg-zinc-900 text-white flex items-center flex-col">
        <div className="w-full md:w-5-6 lg:w-4/6 bg-zinc-800 rounded-lg p-5 flex justify-center flex-col items-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TareasLista />} />
              <Route path="/crear-tarea" element={<TareaFormulario />} />
              <Route path="/editar-tarea/:id" element={<TareaFormulario />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
