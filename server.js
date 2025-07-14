import express from 'express';
// import user
import userRouter from './user/user.routes.js';
import { connectDB } from './db.js';
import todoRouter from './todo/todo.routes.js';
import jwtAuth from './middleware/auth.js';
import cron from "node-cron";
import { sendReminderEmail } from './middleware/nodemailer.js';
import { TodoModel } from './todo/todo.schema.js';
import { UserModel } from './user/user.schema.js';
import cors from 'cors'

const server = express();

server.use(
  cors({
    origin: ["http://localhost:3001", "https://your-frontend.vercel.app"], 
    credentials: true,
  })
);

server.use(express.json()); // for JSON payloads
server.use(express.urlencoded({ extended: true })); // for form data


// Run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  console.log(`Now: ${currentHour}:${currentMinute}`);

  const todos = await TodoModel.find({
    reminderTime: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
    completed: false
  });
//   console.error("Error sending mail:", error);


  for (const todo of todos) {
    const user = await UserModel.findById(todo.userId);
    if (user) {
      await sendReminderEmail(
        user.email,
        "Todo Reminder",
        `Hey ${user.name}, don't forget: "${todo.title}" - ${todo.description}`
      );
    }
  }
});

server.use('/api/users', userRouter)
server.use('/api/todo',jwtAuth,todoRouter)

server.listen(3000, ()=>{
    console.log('Server is up and running at port 3500');
    connectDB()
})

