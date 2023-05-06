import Role from "../models/Role.js"
import User from "../models/User.js"
import { PASSWORD } from "../config.js"

export const createRoles = async () => {

try {
    const count = await Role.estimatedDocumentCount()

    if(count > 0) return

    const values = await Promise.all([
        new Role({name: 'admin'}).save(),
        new Role({name: 'user'}).save(),
        new Role({name: 'chef'}).save(),
        new Role({name: 'customer'}).save(),
    ])

} catch (error) {
    console.error(error)
}

}

export const createUser = async () => {

    try {

        const dataadmin = await Role.findOne({name: 'admin'}) 
        const admin = dataadmin.id
        const datauser = await Role.findOne({name: 'user'})
        const user = datauser.id
        const datachef = await Role.findOne({name: 'chef'})
        const chef = datachef.id
        const datacustomer = await Role.findOne({name: 'customer'})
        const customer = datacustomer.id

        const count = await User.estimatedDocumentCount()
    
        if(count > 0) return
    
        const values = await Promise.all([
            new User({
                ci: '7578870',
                name: 'admin',
                email: 'terryselt@gmail.com',
                password: await User.encriptPassword(PASSWORD),
                roles: [admin, user, chef, customer]
            }).save()
        ])
    } catch (error) {
        console.error(error)
    }
} 

export const initialcreate = async () => {
    await createRoles()
    await createUser()
}