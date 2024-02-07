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


async function importData() {
  try {
    const sneakersData = [
    ];

    for (const sneakerData of sneakersData) {
      await prisma.sneakerData.create({
        data: {
          name: sneakerData.title,
          img: sneakerData.imageUrl,
          price: sneakerData.price,
        }
      });
    }
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
export default router