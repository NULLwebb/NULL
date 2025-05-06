require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка транспорта для отправки почты
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER || 'nullcrop@gmail.com',
    pass: process.env.EMAIL_PASS || 'ваш_пароль_или_ключ_приложения'
  }
});

// Обработчик POST запроса с формы
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"Контактная форма" <${email}>`,
    to: 'nullcrop@gmail.com',
    subject: `Новое сообщение от ${name}`,
    text: `
      Имя: ${name}
      Email: ${email}
      
      Сообщение:
      ${message}
    `,
    html: `
      <h3>Новое сообщение с сайта</h3>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка отправки:', error);
      return res.status(500).json({ success: false, message: 'Ошибка при отправке сообщения' });
    }
    console.log('Сообщение отправлено:', info.messageId);
    res.json({ success: true, message: 'Сообщение успешно отправлено' });
  });
});

// Статическая раздача файлов (если нужно)
app.use(express.static('public'));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});