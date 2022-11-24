import axios from 'axios'

export const getMenusRequest = async () => await axios.get('/menus')

export const createMenuRequest = async (menu) => {
    const form = new FormData()

    for(let key in menu){
        form.append(key, menu[key])
    }

    return await axios.post('/menus', form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteMenuRequest = async id => await axios.delete('/menus/' + id)

export const getMenuRequest = async id => await axios.get('/menus/' + id)

export const updateMenuRequest = async (id, newFields) => await axios.put('/menus/' + id, newFields)