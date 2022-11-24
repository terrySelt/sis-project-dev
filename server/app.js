import express from 'express'
import fileUpload from 'express-fileupload'
import menuRoutes from './routes/menus.routes.js'
import catmenuRoutes from './routes/catmenus.routes.js'

const app = express()

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

//routes
app.use(menuRoutes)
app.use(catmenuRoutes)

export default app