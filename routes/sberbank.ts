// routes/sberbank.ts
import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/pay', async (req, res) => {
	const data = req.body
  try {
    const response = await axios.post('http://3dsec.sberbank.ru/payment/rest/register.do', {
      userName: data.userName,
      password: data.password,
      orderNumber:	data.orderNumber,
      amount: data.amount,
			returnUrl: data.returnUrl,
    });

    // Здесь вы можете обработать ответ от сервера Сбербанка и перенаправить пользователя на страницу оплаты

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send payment request' });
  }
});

export default router;
