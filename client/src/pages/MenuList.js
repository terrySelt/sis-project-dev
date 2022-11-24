import { useMyContext } from "../context/restaurantContext"
import { MenuCard } from "../components/MenuCard"
import { Link } from "react-router-dom"

export function MenuList() {

    const { menus } = useMyContext()

    if(menus.length === 0) return(
      <div className="container">
        <h1>No hay menus</h1>
        <Link className="btn-new-menus" to="/MenuForm">Nuevo menu</Link>
      </div>
          )
    
  return (
    <div className="container">
      <div className="container2-menu">
        {menus.map(menu => (
            <MenuCard menu={menu} key={menu._id}/>
        ))}
      </div>
      <Link className="btn-new-menus" to="/MenuForm">Nuevo menu</Link>
    </div>
  )
}

