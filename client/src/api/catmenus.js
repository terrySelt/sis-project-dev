import axios from 'axios'

export const getCatmenusRequest = async () => await axios.get('/catmenus')

export const createCatmenuRequest = async (catmenu) => await axios.post('/catmenus', catmenu)

export const deleteCatmenuRequest = async id => await axios.delete('/catmenus/' + id)

export const getCatmenuRequest = async id => await axios.get('/catmenus/' + id)

export const updateCatmenuRequest = async (id, newFields) => await axios.put('/catmenus/' + id, newFields)