FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve  # 💡 أهو ده المهم

COPY . .

RUN npm install -g @angular/cli

RUN npm run build --prod

CMD ["serve", "-s", "dist/front-end", "-l", "8080"]
