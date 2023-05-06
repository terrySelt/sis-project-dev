import axios from 'axios'

/* const token = document.cookie.replace('token=', '')
const headers = {
    'x-access-token': token
} */

export const getUsersRequest = async () => await axios.get('/users'/*, {headers:headers}*/)

export const createUserRequest = async (user) => {
    const form = new FormData()

    for(let key in user){
        form.append(key, user[key])
    }

    return await axios.post('/users', form, {
        headers: {
            "Content-Type": "multipart/form-data",
            //'x-access-token': token
        }
    })
}

export const deleteUserRequest = async id => await axios.delete('/users/' + id/*, {headers:headers}*/)

export const getUserRequest = async id => await axios.get('/users/' + id/*, {headers:headers}*/)

export const updateUserRequest = async (id, newFields) => {
    const form = new FormData()

    for(let key in newFields){
        form.append(key, newFields[key])
    }

    return await axios.put('/users/' + id, form, {
        headers: {
            "Content-Type": "multipart/form-data",
            //'x-access-token': token
        }
    })   
}