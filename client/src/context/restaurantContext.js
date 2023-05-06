import { useState, createContext, useContext, useEffect } from "react"
import { getUsersRequest } from "../api/users"
//import { createMenuRequest, getMenusRequest, deleteMenuRequest, getMenuRequest, updateMenuRequest } from "../api/menus"
//import { getCatmenusRequest, createCatmenuRequest, deleteCatmenuRequest, updateCatmenuRequest, getCatmenuRequest } from "../api/catmenus"

const projectContext = createContext()

export const useMyContext = () => {
    const context = useContext(projectContext)
    return context
}

export const RestaurantProvider = ({children}) => {

    //Users---------------------------------------------

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const res = await getUsersRequest()
        setUsers(res.data)
    } 

    //Catmenu---------------------------------------------
    /* const [catmenus, setCatmenus] = useState([])

    const getCatmenus = async () => {
        const res = await getCatmenusRequest()
        setCatmenus(res.data)
    }

    const createCatmenu = async (catmenu) => {
        const existe = catmenus.find( el => el.name === catmenu.name )
        if (!existe) {
            const res = await createCatmenuRequest(catmenu)
            setCatmenus([...catmenus, res.data])
        } else {
            console.log('No seas pendejo, ya existe la categoria')
        }
    }

    const deletecatmenu = async (id) => {
        const res = await deleteCatmenuRequest(id)
        if(res.status === 204) {
            setCatmenus(catmenus.filter((catmenu) => catmenu._id !== id))
            //se actualiza el formuario del menu
            const res = await getMenusRequest()
            setMenus(res.data)
 
        }
    }

    const getCatmenu = async (id) => {
        const res = await getCatmenuRequest(id)
        return res.data
    }

    const updateCatmenu = async(id, catmenu) => {
        const res = await updateCatmenuRequest(id, catmenu)
        setCatmenus(catmenus.map((catmenu) => (catmenu._id===id ? res.data : catmenu)))
    } */

    //Menu------------------------------------------------

/*     const [menus, setMenus] = useState([])

    const getMenus = async () => { 
        const res = await getMenusRequest()
        setMenus(res.data)
    }

    const createMenu = async (menu) => {
        //try {
            const res = await createMenuRequest(menu)
            setMenus([...menus, res.data])
        //} catch (error) {
          //  console.log(error.response.data.message)
        //} logro ver el mesaje de error pero no se como utilizarlo para avisar que es name ya insertado
    }

    const deleteMenu = async (id) => {
        const res = await deleteMenuRequest(id)
        if(res.status === 204) {
            setMenus(menus.filter((menu) => menu._id !== id))
        }
    }

    const getMenu = async (id) => {
        const res = await getMenuRequest(id)
        return res.data
    }

    const updateMenu = async(id, menu) => {
        const res = await updateMenuRequest(id, menu)
        setMenus(menus.map((menu) => (menu._id===id ? res.data : menu)))
    } */

    useEffect(() => {
        getUsers()
        //getCatmenus()
        //getMenus()
      }, [])

    return(
        <projectContext.Provider value={{
            users
            //catmenus,
            //getCatmenus,
            //createCatmenu,
            //deletecatmenu,
            //getCatmenu,
            //updateCatmenu,
            //menus,
            //getMenus,
            //createMenu,
            //deleteMenu,
            //getMenu,
            //updateMenu
        }}>
            {children}
        </projectContext.Provider>
    )

}