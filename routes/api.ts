import Router, { query } from 'express'
import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
const sneakData =  [
  {
    "id": 1,
    "title": "Мужские Кроссовки Nike Blazer Mid Suede 1",
    "price": 12999,
    "imageUrl": "/sneakers/sneakers-1.jpg"
  },

  {
    "id": 2,
    "title": "Мужские Кроссовки Nike Air Max 270 1",
    "price": 15600,
    "imageUrl": "/sneakers/sneakers-2.jpg"
  },
  {
    "id": 3,
    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
    "price": 8499,
    "imageUrl": "/sneakers/sneakers-3.jpg"
  },
  {
    "id": 4,
    "title": "Кроссовки Puma X Aka Boku Future Rider2",
    "price": 7800,
    "imageUrl": "/sneakers/sneakers-4.jpg"
  },
  {
    "id": 5,
    "title": "Кроссовки Future Rider3",
    "price": 9550,
    "imageUrl": "/sneakers/sneakers-5.jpg"
  },
  {
    "id": 6,
    "title": "Кроссовки Black Edition4",
    "price": 16999,
    "imageUrl": "/sneakers/sneakers-6.jpg"
  },
  {
    "id": 7,
    "title": "Кроссовки Orange Boomb Edition5",
    "price": 7499,
    "imageUrl": "/sneakers/sneakers-7.jpg"
  },
  {
    "id": 8,
    "title": "Кроссовки Nike Air Max 2706",
    "price": 15600,
    "imageUrl": "/sneakers/sneakers-8.jpg"
  },
  {
    "id": 9,
    "title": "Кроссовки Nike Air Force 17",
    "price": 5900,
    "imageUrl": "/sneakers/sneakers-9.jpg"
  },
  {
    "id": 10,
    "title": "Кроссовки Adidas Ultraboost 8",
    "price": 11500,
    "imageUrl": "/sneakers/sneakers-10.jpg"
  },
  {
    "id": 11,
    "title": "Кроссовки Puma Clyde All-Pro9",
    "price": 7600,
    "imageUrl": "/sneakers/sneakers-11.jpg"
  },
  {
    "id": 12,
    "title": "Кроссовки Converse Chuck Taylor All-Star4",
    "price": 13000,
    "imageUrl": "/sneakers/sneakers-12.jpg"
  }
] 
// async function importData() {
//   try {
//     const sneakersData = sneakData
     
//       await prisma.sneakerData.createMany({
//         data: sneakersData.map(sneaker => ({
//           title: sneaker.title as string,
//           imageUrl: sneaker.imageUrl as string,
//           price: sneaker.price as number,
//         })),
//       });
//       console.log('Data imported successfully');
//     } catch (error) {
//       console.error('Error importing data:', error);
//     }
//   }
  
//  importData()
router.get('/', async function (req, res) {
  let sneakData = [] as any
  const sortBy = req.query.sortBy
  const title = req.query.title
  const sortObj = {} as any
  if (sortBy=='name') {
    sortObj.orderBy = {title:'asc'}
  } else if (sortBy=='sortByPrice') {
    sortObj.orderBy = {price:'asc'}
  } else {
    sortObj.orderBy = {price:'desc'}
  }
  const search = {} as any
  if (title) {
    search.where = {title: {contains:title}}
  }
  sneakData = await prisma.sneakerData.findMany({...sortObj, ...search})
  res.send(sneakData)
})
interface FilterOptions {
  title?: any;
}

router.get('/?sortBy=sortBy-Price', async (req, res) => {
  let filterOptions: FilterOptions = {};

  if (req.query.search) {
    filterOptions.title = {
      contains: req.query.search 
    };
  }

  const data = await prisma.sneakerData.findMany({
    where: filterOptions,
    orderBy: {
      price: 'asc'
    }
  });
  console.log(data);
  res.send(data);
});
router.get('/?sortBy=sortBy-Price', async (req, res) => {
  let filterOptions: FilterOptions = {};

  if (req.query.search) {
    filterOptions.title = {
      contains: req.query.search 
    };
  }
  console.log(filterOptions)

  const data = await prisma.sneakerData.findMany({
    where: filterOptions,
    orderBy: {
      price: 'desc' 
    }
  });
  console.log(data);
  res.send(data);
});




// router.get('/sortByPrice', async (req, res) => {
//   const data = await prisma.sneakerData.findMany({ 
//     orderBy: {
//       price: 'asc'
//     }
//   })
//   console.log(data)
//   res.send(data)
// })
// router.get('/sortBy-Price', async (req, res) => {
//   const data = await prisma.sneakerData.findMany({ 
//     orderBy: {
//       price: 'desc'
//     }
//   })
//   console.log(data)
//   res.send(data)
// })
export default router