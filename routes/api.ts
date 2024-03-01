import Router, { query } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
const sneakData = [
  {
    id: 1,
    title: "Мужские Кроссовки Nike Blazer Mid Suede 1",
    price: 12999,
    imageUrl: "/sneakers/sneakers-1.jpg",
    sex: "male",
  },

  {
    id: 2,
    title: "Мужские Кроссовки Nike Air Max 270 1",
    price: 15600,
    imageUrl: "/sneakers/sneakers-2.jpg",
    sex: "male",
  },
  {
    id: 3,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "/sneakers/sneakers-3.jpg",
    sex: "male",
  },
  {
    id: 4,
    title: "Кроссовки Puma X Aka Boku Future Rider2",
    price: 7800,
    imageUrl: "/sneakers/sneakers-4.jpg",
    sex: "male",
  },
  {
    id: 5,
    title: "Кроссовки Future Rider3",
    price: 9550,
    imageUrl: "/sneakers/sneakers-5.jpg",
    sex: "male",
  },
  {
    id: 6,
    title: "Кроссовки Black Edition4",
    price: 16999,
    imageUrl: "/sneakers/sneakers-6.jpg",
    sex: "male",
  },
  {
    id: 7,
    title: "Кроссовки Orange Boomb Edition5",
    price: 7499,
    imageUrl: "/sneakers/sneakers-7.jpg",
    sex: "male",
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Max 2706",
    price: 15600,
    imageUrl: "/sneakers/sneakers-8.jpg",
    sex: "male",
  },
  {
    id: 9,
    title: "Кроссовки Nike Air Force 17",
    price: 5900,
    imageUrl: "/sneakers/sneakers-9.jpg",
    sex: "male",
  },
  {
    id: 10,
    title: "Кроссовки Adidas Ultraboost 8",
    price: 11500,
    imageUrl: "/sneakers/sneakers-10.jpg",
    sex: "male",
  },
  {
    id: 11,
    title: "Кроссовки Puma Clyde All-Pro9",
    price: 7600,
    imageUrl: "/sneakers/sneakers-11.jpg",
    sex: "male",
  },
  {
    id: 12,
    title: "Кроссовки Converse Chuck Taylor All-Star4",
    price: 13000,
    imageUrl: "/sneakers/sneakers-12.jpg",
    sex: "male",
  },
  {
    id: 13,
    title: "Ботинки Dr martens",
    price: 18000,
    imageUrl: "/sneakers/martens.jpeg",
    sex: "female",
  },
  {
    id: 14,
    title: "Кроссовки Blazer",
    price: 12500,
    imageUrl: "/sneakers/blaze.jpeg",
    sex: "female",
  },
  {
    id: 15,
    title: "Кроссовки Converse",
    price: 16000,
    imageUrl: "/sneakers/conv.jpeg",
    sex: "female",
  },
  {
    id: 16,
    title: "Кроссовки Air Max 95",
    price: 22000,
    imageUrl: "/sneakers/air.jpeg",
    sex: "female",
  },
  {
    id: 17,
    title: "Кроссовки Vans double bump",
    price: 13000,
    imageUrl: "/sneakers/duble.jpeg",
    sex: "female",
  },
  {
    id: 18,
    title: "Кроссовки Nike dunk low",
    price: 13000,
    imageUrl: "/sneakers/dunks.jpeg",
    sex: "female",
  },
];
// router.get("/import", async function (req, res) {
// async function importData() {
//   try {
//     const sneakersData = sneakData

//       await prisma.sneakerData.createMany({
//         data: sneakersData.map(sneaker => ({
//           title: sneaker.title as string,
//           imageUrl: sneaker.imageUrl as string,
//           price: sneaker.price as number,
//           sex: sneaker.sex as string
//         })),
//       });
//       console.log('Data imported successfully');
//     } catch (error) {
//       console.error('Error importing data:', error);
//     }
//   }

//  importData()
// res.send({})
// })
router.get("/", async function (req, res) {
  let sneakData = [] as any;
  const sortBy = req.query.sortBy;
  const title = req.query.title;
  const sortObj = {} as any;
  if (sortBy == "name") {
    sortObj.orderBy = { title: "asc" };
  } else if (sortBy == "sortByPrice") {
    sortObj.orderBy = { price: "asc" };
  } else {
    sortObj.orderBy = { price: "desc" };
  }
  const search = {} as any;
  if (title) {
    search.where = { title: { contains: title, mode: "insensitive" } };
  }
  sneakData = await prisma.sneakerData.findMany({ ...sortObj, ...search });
  res.send(sneakData);
});

router.post("/createUser", async function (req, res) {
  const userData = req.body;
  let isError = { status: false, message: "" };
  try {
    const mail = await prisma.user.findUnique({
      where: {
        email: userData.email,
      }
    })
    if (mail) {
      // mail zaniat
    } else {
      const user = await prisma.user.create({
        data: {
          first_name: userData.name,
          email: userData.email,
          hash: userData.password,
          created_at: new Date(),
        },
      });
      res.json(user);
    }

  } catch (error) {
    isError.status = true;
    isError.message = error as string;
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      res.status(200).json({ success: true, user: user });
    } else {
      res.status(401).json({
        success: false,
        message: "Неверный адрес электронной почты или пароль",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Произошла ошибка при попытке входа" });
  }
});

router.post("/get-data", async function (req, res) {
  const userInfo = req.body;
  const id = parseInt(userInfo.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
        uuid: userInfo.uuid,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Произошла ошибка при попытке получении данных",
    });
  }
});

router.post("/add-to-favorites", async function (req, res) {
  try {
    const { userId, sneakerId } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        Favorite: {
          connect: { id: Number(sneakerId) },
        },
      },
      include: {
        Favorite: true,
      },
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Ошибка при добавлении кроссовка в избранное:", error);
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при добавлении кроссовка в избранное",
    });
  }
});



router.post('/favorites-user', async (req, res) => {
  const idUser = req.body.id
  try{
    if (!idUser) {
      return res.status(400).send("ID parameter is missing");
    }
  const sneakersFavorites = await prisma.user.findMany({
    where:{
      id: Number(idUser),
    },
    select:{
      id:true,
      Favorite:true
    }
  })
  if(sneakersFavorites){
    res.status(200).send(sneakersFavorites)
  }
  }catch(error){
    console.log(error)
    res.status(500).send(error)
  }
  })

  router.post("/remove-from-favorites", async function (req, res) {
    try {
      const { userId, sneakerId } = req.body;
      if(!userId){
        res.status(400).send("ID parameter is missing");
      }
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          Favorite: {
            disconnect: { id: Number(sneakerId) },
          },
        },
        include: {
          Favorite: true,
        },
      });
  
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Ошибка при добавлении кроссовка в избранное:", error);
      res.status(500).json({
        success: false,
        message: "Произошла ошибка при добавлении кроссовка в избранное",
      });
    }
  });
  router.get('/manSneakers', async function(req,res){
    try{
      const sneakers = await prisma.sneakerData.findMany({
        where:{
          sex: 'male'
        }
      })
      res.status(200).send(sneakers)
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
    
  })
  router.get('/womanSneakers', async function(req,res){
    try{
      const sneakers = await prisma.sneakerData.findMany({
        where:{
          sex: 'female'
        }
      })
      res.status(200).send(sneakers)
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
    
  })
  
export default router;
