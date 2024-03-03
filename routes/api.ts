import Router, { query } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// Описываем функцию, которая будет обрабатывать GET запросы на адрес '/'
const sneakData = [
  {
    id: 1,
    title: "Мужские Кроссовки NewBalance 550",
    price: 10999,
    imageUrl: "/sneakers/NewBalance550.jpeg",
    sex: "male",
  },

  {
    id: 2,
    title: "Мужские Кроссовки Nike Dunk Low Retro PRM",
    price: 15600,
    imageUrl: "/sneakers/NikeDunkLowRetroPRM.jpeg",
    sex: "male",
  },
  {
    id: 3,
    title: "Мужские Кроссовки Adidas Superstar",
    price: 7800,
    imageUrl: "/sneakers/adidasSuperstar.jpeg",
    sex: "male",
  },
  {
    id: 4,
    title: "Кроссовки Nike AirMax 90",
    price: 26700,
    imageUrl: "/sneakers/airMaxMen.jpeg",
    sex: "male",
  },
  {
    id: 5,
    title: "Кроссовки Asics Ballaholic EX89",
    price: 11250,
    imageUrl: "/sneakers/ASICSBallaholicEX89.jpeg",
    sex: "male",
  },
  {
    id: 6,
    title: "Ботинки Converse ChuckTaylor AllStar  All Terrain",
    price: 19990,
    imageUrl: "/sneakers/ConverseChuckTaylorAllStarAllTerrain.jpeg",
    sex: "male",
  },
  {
    id: 7,
    title: "Кроссовки Jordan",
    price: 16099,
    imageUrl: "/sneakers/jordan.jpeg",
    sex: "male",
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Trainer 1 Essential",
    price: 22600,
    imageUrl: "/sneakers/NikeAirTrainer1Essential.jpeg",
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
    title: "Ботинки Puma Ca pro Mid Trail",
    price: 13500,
    imageUrl: "/sneakers/PUMACAProMidTrail.jpeg",
    sex: "male",
  },
  {
    id: 11,
    title: "Ботинки The North Face Larimer Mid",
    price: 25000,
    imageUrl: "/sneakers/TheNorthFaceLarimerMid.jpeg",
    sex: "male",
  },
  {
    id: 12,
    title: "Ботинки Timberland 6 Inch Premium Boot",
    price: 33000,
    imageUrl: "/sneakers/Timberland6InchPremiumBoot.jpeg",
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
  {
    id: 18,
    title: "Кеды Vans SK8 Low Black",
    price: 12000,
    imageUrl: "/sneakers/vanslow.jpeg",
    sex: "male",
  },
  {
    id: 19,
    title: "Кеды Vans SK8 Low White",
    price: 11000,
    imageUrl: "/sneakers/vansSk8Low.jpeg",
    sex: "male",
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
  router.get('/sneaker', async function(req,res){
    const idParam = req.query.id as string
    let idSneak = parseInt(idParam)
    
    if (isNaN(idSneak)) {
      return res.status(400).send('Invalid sneaker ID');
  }

    try{
    const data = await prisma.sneakerData.findUnique({
      where:{
        id: idSneak,
      },
    })
    console.log(data)
    res.status(200).send(data)
  } catch(error){
    console.log(typeof(idSneak))
    res.status(500).send(typeof(idSneak))
  }
  })
export default router;
