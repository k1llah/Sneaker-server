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
    brand: "NewBalance",
    color: "Белый",
    description: "Мужские кроссовки NewBalance 550 - это стильная и комфортная обувь для активного образа жизни. Они сочетают в себе классический дизайн и современные технологии, что делает их идеальным выбором для спортивных тренировок и повседневной носки.",
    materials: "Верх кроссовок изготовлен из качественного текстиля и искусственной кожи. Подошва выполнена из прочной резины, обеспечивающей отличное сцепление с поверхностью.",
    countryMade: "Сделано в США"
  },
  {
    id: 2,
    title: "Мужские Кроссовки Nike Dunk Low Retro PRM",
    price: 15600,
    imageUrl: "/sneakers/NikeDunkLowRetroPRM.jpeg",
    sex: "male",
    brand: "Nike",
    color: "Серый",
    description: "Мужские кроссовки Nike Dunk Low Retro PRM - это воплощение стиля и комфорта. Они отлично подойдут как для повседневной носки, так и для спортивных мероприятий, придавая вашему образу неповторимый вид.",
    materials: "Верх кроссовок выполнен из прочного замшевого материала, а подошва изготовлена из высококачественной резины с амортизирующими свойствами.,",
    countryMade: "Сделано в Вьетнаме"
  },
  {
    id: 3,
    title: "Мужские Кроссовки Adidas Superstar",
    price: 7800,
    imageUrl: "/sneakers/adidasSuperstar.jpeg",
    sex: "male",
    brand: "Adidas",
    color: "Белый",
    description: "Мужские кроссовки Adidas Superstar - это икона стиля и комфорта. Они отлично подойдут для повседневной носки и спортивных тренировок, обеспечивая вашим ногам надежную поддержку и удобство.",
    materials: "Верх кроссовок выполнен из высококачественной кожи, а подошва изготовлена из прочной резины.",
    countryMade: "Сделано в Индонезии"
  },
  {
    id: 4,
    title: "Кроссовки Nike AirMax 90",
    price: 26700,
    imageUrl: "/sneakers/airMaxMen.jpeg",
    sex: "male",
    brand: "Nike",
    color: "Белый",
    description: "Кроссовки Nike AirMax 90 - это символ комфорта и стиля. Их уникальный дизайн и передовые технологии делают их отличным выбором для спортивных мероприятий и повседневной носки.",
    materials: "Верх кроссовок выполнен из дышащего текстиля и прочной искусственной кожи. Подошва оснащена воздушной амортизацией Air Max для максимального комфорта при ходьбе.",
    countryMade: "Сделано в Китае"
  },
  {
    id: 5,
    title: "Кроссовки Asics Ballaholic EX89",
    price: 11250,
    imageUrl: "/sneakers/ASICSBallaholicEX89.jpeg",
    sex: "male",
    brand: "Asics",
    color: "Бежевый",
    description: "Кроссовки Asics Ballaholic EX89 - это идеальный выбор для спортивных занятий и повседневной носки. Они обеспечивают отличную поддержку и комфорт вашим ногам в любой ситуации.",
    materials: "Верх кроссовок изготовлен из дышащего текстиля, а подошва выполнена из прочной резины с амортизирующими вставками.",
    countryMade: "Сделано в Китае"
  },
  {
    id: 6,
    title: "Ботинки Converse ChuckTaylor AllStar  All Terrain",
    price: 19990,
    imageUrl: "/sneakers/ConverseChuckTaylorAllStarAllTerrain.jpeg",
    sex: "male",
    brand: "Converse",
    color: "Черный",
    description: "Ботинки Converse ChuckTaylor AllStar All Terrain - это надежная и стильная обувь для активного образа жизни. Они отлично подходят для городских прогулок и легких приключений на природе.",
    materials: "Верх ботинок изготовлен из прочного текстиля, а подошва оснащена протектором для отличного сцепления с различными поверхностями.",
    countryMade: "Сделано во Вьетнаме"
  },
  {
    id: 7,
    title: "Кроссовки Jordan",
    price: 16099,
    imageUrl: "/sneakers/jordan.jpeg",
    sex: "male",
    brand: "Nike",
    color: "Белый, зеленый",
    description: "Кроссовки Jordan - это идеальный выбор для тех, кто ценит комфорт и стиль. Они отлично подойдут как для спортивных тренировок, так и для повседневной носки, придавая вашему образу неповторимый вид.",
    materials: "Верх кроссовок выполнен из прочного материала, а подошва изготовлена из резины с амортизирующими вставками для максимального комфорта при ходьбе.",
    countryMade: "Сделано в Китае"
  },
  {
    id: 8,
    title: "Кроссовки Nike Air Trainer 1 Essential",
    price: 22600,
    imageUrl: "/sneakers/NikeAirTrainer1Essential.jpeg",
    sex: "male",
    brand: "Nike",
    color: "Белый, Желтый",
    description: "Кроссовки Nike Air Trainer 1 Essential - это идеальное сочетание стиля и комфорта. Они обеспечивают отличную поддержку и амортизацию, делая каждый шаг легким и комфортным.",
    materials: "Верх кроссовок изготовлен из дышащего материала, а подошва оснащена амортизирующей технологией для максимального комфорта при ходьбе.",
    countryMade: "Сделано в Индонезии"
  },
  {
    id: 9,
    title: "Кеды Converse high",
    price: 8900,
    imageUrl: "/sneakers/converseHigh.jpeg",
    sex: "male",
    brand: "Converse",
    color: "Черный",
    description: "Кеды Converse High - это классический вариант обуви для повседневной носки. Их стильный дизайн и высокое качество делают их идеальным выбором для активного образа жизни.",
    materials: "Верх кед выполнен из прочного текстиля, а подошва изготовлена из износостойкой резины.",
    countryMade: "Сделано во Вьетнаме"
  },
  {
    id: 10,
    title: "Ботинки Puma Ca pro Mid Trail",
    price: 13500,
    imageUrl: "/sneakers/PUMACAProMidTrail.jpeg",
    sex: "male",
    brand: "Puma",
    color: "Черный",
    description: "Ботинки Puma Ca pro Mid Trail - это стильная и удобная обувь для активного отдыха на природе. Они обеспечивают надежную защиту и комфорт в любых условиях.",
    materials: "Верх ботинок изготовлен из прочного материала, а подошва оснащена протектором для отличного сцепления с различными поверхностями.",
    countryMade: "Сделано в Китае"
  },
  {
    id: 11,
    title: "Ботинки The North Face Larimer Mid",
    price: 25000,
    imageUrl: "/sneakers/TheNorthFaceLarimerMid.jpeg",
    sex: "male",
    brand: "TheNorthFace",
    color: "Темно-коричневый",
    description: "Ботинки The North Face Larimer Mid - это надежная и стильная обувь для путешествий и активного отдыха на природе. Они обеспечивают надежную защиту и комфорт в любых условиях.",
    materials: "Верх ботинок изготовлен из прочного нубука, а подошва оснащена протектором для отличного сцепления с различными поверхностями.",
    countryMade: "Сделано в Вьетнаме"
  },
  {
    id: 12,
    title: "Ботинки Timberland 6 Inch Premium Boot",
    price: 33000,
    imageUrl: "/sneakers/Timberland6InchPremiumBoot.jpeg",
    sex: "male",
    brand: "Timberland",
    color: "Рыжий",
    description: "Ботинки Timberland 6 Inch Premium Boot - это идеальный выбор для тех, кто ценит комфорт и надежность. Они отлично подходят для городских прогулок и активного отдыха на природе.",
    materials: "Верх ботинок изготовлен из прочной натуральной кожи, а подошва оснащена протектором для отличного сцепления с различными поверхностями.",
    countryMade: "Сделано в Доминиканской Республике"
  },
  {
    id: 13,
    title: "Ботинки Dr martens",
    price: 18000,
    imageUrl: "/sneakers/martens.jpeg",
    sex: "female",
    brand: "DrMartens",
    color: "Черный",
    description: "Ботинки Dr. Martens - это символ стиля и надежности. Они отлично подойдут как для повседневной носки, так и для создания яркого образа.",
    materials: "Верх ботинок изготовлен из прочной натуральной кожи",
    countryMade: "Страна изготовитель: Вьетнам"
  },
  {
    id: 14,
    title: "Кроссовки Blazer",
    price: 12500,
    imageUrl: "/sneakers/blaze.jpeg",
    sex: "female",
    brand: "Nike",
    color: "Белый",
    description: "Кроссовки Blazer от Nike - это стильная и комфортная обувь для женщин, которая подойдет как для повседневной носки, так и для спортивных мероприятий. Эти кроссовки сочетают в себе классический дизайн и современные технологии.",
    materials: "Верх кроссовок выполнен из прочной кожи и дышащего текстиля, что обеспечивает комфорт и долговечность. Подошва изготовлена из прочного резинового материала с отличным сцеплением с поверхностью.",
    countryMade: "Страна изготовитель: Вьетнам"
    },
    {
      id: 15,
      title: "Кроссовки Converse",
      price: 16000,
      imageUrl: "/sneakers/conv.jpeg",
      sex: "female",
      brand: "Converse",
      color: "Черный",
      description: "Женские кроссовки Converse - это икона стиля и комфорта. Они подойдут как для повседневной носки, так и для создания ярких образов. Кроссовки Converse всегда в тренде и гармонично вписываются в любой гардероб.",
      materials: "Верх кроссовок выполнен из прочного текстиля, обеспечивающего отличную вентиляцию. Подошва изготовлена из прочной резины, обеспечивающей надежное сцепление с поверхностью.",
      countryMade: "Страна изготовитель: Индонезия"
    },
    
    {
      id: 16,
      title: "Кроссовки Air Max 90",
      price: 22000,
      imageUrl: "/sneakers/air.jpeg",
      sex: "female",
      brand: "Nike",
      color: "Белый",
      description: "Женские кроссовки Air Max 90 - это легендарная модель от Nike, которая сочетает в себе стильный дизайн и высокую функциональность. Они подойдут как для активного отдыха, так и для создания модных уличных образов.",
      materials: "Верх кроссовок выполнен из комбинации кожи и текстиля, что обеспечивает прочность и комфорт. Подошва с воздушной амортизацией обеспечивает отличную амортизацию и комфорт при ходьбе.",
      countryMade: "Страна изготовитель: Вьетнам"
    },
    
    {
      id: 17,
      title: "Кроссовки Vans double bump",
      price: 13000,
      imageUrl: "/sneakers/duble.jpeg",
      sex: "female",
      brand: "Vans",
      color: "Черный",
      description: "Женские кроссовки Vans double bump - это стильная и удобная обувь для активного образа жизни. Они идеально подходят как для повседневной носки, так и для занятий спортом или прогулок.",
      materials: "Верх кроссовок выполнен из прочного текстиля, обеспечивающего комфорт и вентиляцию. Подошва изготовлена из резины с улучшенным сцеплением, что обеспечивает надежность на различных поверхностях.",
      countryMade: "Страна изготовитель: Китай"
    },
    
    {
      id: 18,
      title: "Кроссовки Nike dunk low",
      price: 13000,
      imageUrl: "/sneakers/dunks.jpeg",
      sex: "female",
      brand: "Nike",
      color: "Белый",
      description: "Женские кроссовки Nike Dunk Low - это стильная и комфортная обувь для женщин, которая подойдет как для повседневной носки, так и для спортивных мероприятий. Эти кроссовки обладают уникальным дизайном и высоким качеством.",
      materials: "Верх кроссовок выполнен из прочной кожи и дышащего текстиля, обеспечивающих комфорт и долговечность. Подошва изготовлена из резины с хорошим сцеплением с поверхностью.",
      countryMade: "Страна изготовитель: Вьетнам"
    },
    
    {
      id: 19,
      title: "Кеды Vans SK8 Low White",
      price: 11000,
      imageUrl: "/sneakers/vansSk8Low.jpeg",
      sex: "male",
      brand: "Vans",
      color: "Белый",
      description: "Мужские кеды Vans SK8 Low White - это идеальный выбор для стильных и активных мужчин. Эти кеды сочетают в себе классический дизайн и высокое качество, что делает их незаменимыми в повседневной жизни.",
      materials: "Верх кед выполнен из качественного текстиля, обеспечивающего комфорт и долговечность. Подошва изготовлена из прочной резины с хорошим сцеплением.",
      countryMade: "Страна изготовитель: Китай"
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
//           sex: sneaker.sex as string,
//           color: sneaker.color as string,
//           brand: sneaker.brand as string,
//           description: sneaker.description as string,
//           materials: sneaker.materials as string,
//           countryMade: sneaker.countryMade as string,
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
        profileImg: true,
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

  router.post('/edit-profile', async function(req,res){
    const dataToUpdate = JSON.parse(req.body.data)
    console.log(dataToUpdate)
    console.log(req.body.images)
    try{
      const data = await prisma.user.update({
        where:{
          id: +dataToUpdate.id,
          uuid: dataToUpdate.uuid
        },
        data: {
          first_name: dataToUpdate.first_name,
          last_name: dataToUpdate.last_name,
          email: dataToUpdate.email,
          profileImg: req.body.images[0]?.newName
        }
      })
      res.status(200).send(data)
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
  })

  router.post('/create-address', async (req,res)=>{
    const dataToCreate = req.body
    
    try{
    const create = await prisma.address.create({
      data: {
        userId: parseInt(dataToCreate.userId),
        firstName: dataToCreate.firstName,
        lastName:dataToCreate.lastName,
        surname:dataToCreate.surname,
        phoneNumber:dataToCreate.phoneNumber,
        buildingNumber:dataToCreate.buildingNumber,
        houseNumber:dataToCreate.houseNumber,
        apartment:dataToCreate.apartment,
        postalCode:dataToCreate.postalCode,
        city: dataToCreate.city,
        street: dataToCreate.street, 

      },
    })
    res.status(200).send(create)
    console.log('Successfully created address')
  }catch(error){
    res.status(400).send(error)
    console.log(dataToCreate, error)
  }
  })
  router.post('/get-addresses', async (req,res)=>{
    const userId = req.body.userId
    try{
      const addresses = await prisma.address.findMany({
        where:{
          userId: parseInt(userId)
        }
      })
      res.status(200).send(addresses)
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
  })
  router.post('/get-address', async (req,res)=>{
    const userId = req.body.userId
    try{
      const address = await prisma.address.findFirst({
        where:{
          id: parseInt(req.body.addressId),
          userId: parseInt(userId)
        }
      })
      res.status(200).send(address)
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
  })
  router.post('/update-address', async (req,res)=>{
    const dataToUpdate = req.body
    try{
    const dataUpdate = await prisma.address.update({
      where:{
        id: parseInt(dataToUpdate.id),
        userId: parseInt(dataToUpdate.userId)
      },
      data:{
        firstName: dataToUpdate.firstName,
        lastName:dataToUpdate.lastName,
        surname:dataToUpdate.surname,
        phoneNumber:dataToUpdate.phoneNumber,
        buildingNumber:dataToUpdate.buildingNumber,
        houseNumber:dataToUpdate.houseNumber,
        apartment:dataToUpdate.apartment,
        postalCode:dataToUpdate.postalCode,
        city: dataToUpdate.city,
        street: dataToUpdate.street, 
      }
    })
    res.status(200).send(dataUpdate)
    console.log('Successfully updated address')
  }catch(error){
    console.log(error)
    res.status(500).send(error)
  }
  })

  router.post('/delete-address', async (req,res)=>{
    const dataToDelete = req.body
    console.log('Data to delete:', dataToDelete); 
    try{
      const deleteAddress = await prisma.address.delete({
        where:{
          id: dataToDelete.id,
          userId: parseInt(dataToDelete.userId)
        }
      })
      res.status(200).send(deleteAddress)
      console.log('Successfully deleted address')
    }catch(error){
      console.log(error)
      res.status(500).send(error)
    }
  })
  // router.post('/add-to-cart', async (req, res) => {
  //   const userData = req.body;
  
  //   try {
   
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         id: parseInt(userData.userId)
  //       },
  //       include: {
  //         cart: true // Включаем корзину пользователя
  //       }
  //     });
  
  //     if (!user) {
  //       return res.status(404).send("Пользователь не найден");
  //     }
  
      
  //     const sneakerData = await prisma.sneakerData.findUnique({
  //       where: {
  //         id: userData.sneakerId
  //       }
  //     });
  
  //     if (!sneakerData) {
  //       return res.status(404).send("Информация о кроссовке не найдена");
  //     }
  
  //     // Добавим кроссовок в корзину пользователя
  //     const updatedUser = await prisma.user.update({
  //       where: {
  //         id: userData.userId
  //       },
  //       data: {
  //         cart: {
  //           connect: {
  //             id: userData.id // Подключаем кроссовок к корзине
  //           }
  //         }
  //       },
  //       include: {
  //         cart: true // Включаем обновленную корзину пользователя
  //       }
  //     });
  
  //     res.status(200).send(updatedUser.cart);
  //     console.log('Кроссовок успешно добавлен в корзину');
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Ошибка сервера");
  //   }
  // });
  router.post('/createFeedback', async (req, res) => {
    
  })
export default router;

