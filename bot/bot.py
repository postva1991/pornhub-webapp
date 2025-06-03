from aiogram import Bot, Dispatcher, types, executor
import os

TOKEN = os.getenv("BOT_TOKEN")  # или впиши напрямую
WEBAPP_URL = "https://your-vercel-app.vercel.app"

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def start(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    web_button = types.KeyboardButton(text="🔞 Смотреть видео", web_app=types.WebAppInfo(url=WEBAPP_URL))
    keyboard.add(web_button)
    await message.answer("Добро пожаловать! Открой WebApp по кнопке ниже:", reply_markup=keyboard)

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)
