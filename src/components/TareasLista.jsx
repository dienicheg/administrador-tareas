import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { eliminarTarea, pendienteTarea } from "../features/tareas/tareasSlice";

function TareasLista() {
  const tareas = useSelector((state) => state.tareas);
  const dispatch = useDispatch();

  const handleEliminar = (id) => {
    dispatch(eliminarTarea(id));
  };
  const handlePendiente = (tarea) => {
    dispatch(pendienteTarea(tarea));
  };

  return (
    <div className="h-full w-full">
      <div className="block md:flex md:justify-between items-center py-4">
        {tareas.length === 0 ? (
          <h2 className="text-xl mb-3">Aún no hay tareas, comienza agregando una...</h2>
        ) : (
          <h2 className="text-xl mb-3">Tareas: {tareas.length}</h2>
        )}
        <Link
          to="crear-tarea"
          className="bg-indigo-600 px-2 py-1 rounded-md text-md"
        >
          Agregar Tarea
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tareas.map((tarea) => (
         
            <div key={tarea.id} className="bg-zinc-700 rounded-md p-4">
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-lg mr-2 font-bold w-auto">
                  {tarea.titulo}
                </h3>
                <button
                  onClick={() => handlePendiente(tarea)}
                  className={`text-lg max-h-10 w-auto px-2 rounded-md ${
                    tarea.pendiente ? "bg-yellow-700" : "bg-indigo-700"
                  } `}
                >
                  {tarea.pendiente ? "Pendiente" : "Completa"}
                </button>
              </div>
              <p>{tarea.descripcion}</p>
            </div>
            <div className="flex justify-between gap-x-2 my-2">
              <Link
                to={`editar-tarea/${tarea.id}`}
                className="bg-zinc-600 px-2 text-lg py-1 rounded-md"
              >
                Editar
              </Link>
              <button
                onClick={() => handleEliminar(tarea.id)}
                className="bg-red-500 px-2 text-lg py-1 rounded-md"
              >
                Eliminar
              </button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default TareasLista;
