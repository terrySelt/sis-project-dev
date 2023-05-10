import express from 'express'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import cors from 'cors'

import categorymenuRoutes from './routes/categorys.routes.js'
import menuRoutes from './routes/menus.routes.js'
import userRoutes from './routes/users.routes.js'
import orderRoutes from './routes/orders.routes.js'
import orderItemRoutes from './routes/ordersItems.routes.js'
import supplieRoutes from './routes/supplies.routes.js'
import promotionRoutes from './routes/promotions.routes.js'
import couponRoutes from './routes/coupons.routes.js'

import { initialcreate } from './libs/initialSetup.js'

const app = express()

initialcreate()

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cors())
app.use(morgan('dev'))

//routes
app.use(categorymenuRoutes)
app.use(menuRoutes)
app.use(userRoutes)
app.use(orderRoutes)
app.use(orderItemRoutes)
app.use(supplieRoutes)
app.use(promotionRoutes)
app.use(couponRoutes)

export default app