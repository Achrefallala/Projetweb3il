FROM node:16 AS build

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


COPY . .


RUN npm run build


FROM node:16

WORKDIR /app


COPY --from=build /app/build /app/build


RUN npm install -g serve


EXPOSE 3000


CMD ["serve", "-s", "build", "-l", "3000"]
