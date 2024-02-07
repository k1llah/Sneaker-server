import Router from 'express'
// import axios from 'axios'
// import fs from 'fs'
import { PrismaClient, User, Role } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
router.get('/', function (req, res) {
  res.send('Hello World')
})
export default router