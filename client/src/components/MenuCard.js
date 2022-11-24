import toast from 'react-hot-toast'
import { useMyContext } from '../context/restaurantContext'
import { useNavigate } from 'react-router-dom'
import { MdModeEdit, MdDelete } from "react-icons/md";
import '../css/menulist.css'

export function MenuCard({menu}) {
  const {deleteMenu} = useMyContext()
  const navigate = useNavigate()
  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p className='parrafo-rotification-menulist'>Esta seguro de eliminar el menú? <strong>{id}</strong></p>
        <div className='btn-notification-menulist'>
          <button onClick={() => {
            deleteMenu(id)
            toast.dismiss(t.id)
            }}>Eliminar</button>
          <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
        </div>
      </div>
    ))
    }
    return (
      <div className='prueba'>
        <div className='img-div-menu'>
            {menu.image && <div className='img-menu'><img src={menu.image.url} /></div>}
            <div className='price-menulist'>
                <p>{menu.price} Bs</p>
            </div>
        </div>
        <div className='card-menulist'>
          <h3>{menu.name}</h3>
          <p>{menu.short_description}</p>
          <div className='cont-card-menulist'>  
            <p>Categoria:</p>
            <p>{menu.category}</p>
          </div>
          <div className='data-menulist'>
            <div className='points-menulist'>
              <p>Puntos:</p>
              <p>{menu.points}</p>
            </div>
            <div className='menulisticons'>
              <button onClick={() => navigate(`/menus/${menu._id}`)}><MdModeEdit/></button>
              <button onClick={() => handleDelete(menu._id)}><MdDelete/></button>
            </div>
          </div>
        </div>
      </div>  
    )
}
