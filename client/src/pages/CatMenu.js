import { useMyContext } from "../context/restaurantContext"
import { Link } from "react-router-dom"
import { MdModeEdit, MdDelete } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import '../css/catmenu.css'

export function CatMenu() {
    const { catmenus, deletecatmenu } = useMyContext()
    const navigate = useNavigate()

    const handleDelete = (id) => {
        toast((t) => (
          <div>
            <p className='parrafo-rotification-catmenu'>Estas seguro de eliminar la categoria del menú? <strong>{id}</strong></p>
            <div className='btn-notification-catmenu'>
              <button onClick={() => { 
                deletecatmenu(id)
                toast.dismiss(t.id)
                }}>Elminar</button>
              <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
            </div>
          </div>
        ))
      }

    if(catmenus.length === 0) return(
            <div className="container">
                <h1>No hay categorias de menu</h1>
                <Link to={'/CatmenuForm'} className='new-catmenu'>Nueva Categoria</Link>
            </div>
        )
    return (
    <div className='container'>
      <div className="new-catmenu-div">
        <Link to={'/CatmenuForm'} className='new-catmenu'>Nueva Categoria</Link>
      </div>
      <div className="new-catmenu-div">
        <Link to={'/menuform'} className='new-catmenu'>Nuevo menu</Link>
      </div>
      <div className="container2">
        <h3>Categorias del menu</h3>
        {catmenus.map(catmenu => (
        <div key={catmenu._id} className='catmenutable'>
          {catmenu.name}
          <div className='caticons'>
            <button onClick={() => navigate(`/catmenus/${catmenu._id}`)}><MdModeEdit/></button>
            <button onClick={() => handleDelete(catmenu._id)}><MdDelete/></button>
          </div>
        </div>))}
      </div>
    </div>
  )
}


