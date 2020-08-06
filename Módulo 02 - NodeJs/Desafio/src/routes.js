import express from 'express'

import GradeController from './controllers/GradeController.js'

const routes = express.Router()

routes.get('/grade', GradeController.index)

export default routes