# استخدم صورة رسمية من Node.js
FROM node:18

# تعيين مجلد العمل
WORKDIR /usr/src/app

# نسخ الملفات
COPY package*.json ./

# تثبيت الـ dependencies
RUN npm install

# نسخ باقي الملفات
COPY . .

# فتح المنفذ
EXPOSE 8000

# تشغيل السيرفر
CMD ["node", "login/backend/server.js"]
