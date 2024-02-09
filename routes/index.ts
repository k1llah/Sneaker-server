import Router from 'express'
// import axios from 'axios'
// import fs from 'fs'

const router = Router()

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
router.get('/', function (req, res) {
  res.send('Hello World')
})

export default router
