# FROM node:lts-alpine

# WORKDIR /server
# COPY package*.json .
# # RUN npm install

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --omit=dev; \
#         fi

# COPY . .

# EXPOSE $PORT
# CMD ["npm", "start"]

#MULTI LAYER PATTERN

#Our first stage, that is the Builder
# FROM node:lts-alpine AS base

# WORKDIR /server
# COPY . .
# RUN npm install
# RUN npm run clean
# RUN npm run build

# # Our Second stage, that creates an image for production
# FROM node:lts-alpine

# WORKDIR /server
# COPY --from=base ./server/dist ./dist
# COPY package*.json .
# RUN npm install --omit=dev

# EXPOSE $PORT
# CMD ["node", "./dist/server.js"]

FROM node:lts-alpine as base
WORKDIR /server
COPY package*.json  .
COPY . .
ARG ENV
RUN if [ "$ENV" = "production" ]; \
        then npm install; \
        fi
RUN if [ "$ENV" = "production" ]; \
        then npm run build; \
        fi
EXPOSE $PORT

# Dev
FROM base as dev
RUN npm install
CMD ["npm", "run", "dev"]

# Prod
FROM node:lts-alpine as prod
WORKDIR /server
COPY --from=base ./server/dist ./dist
COPY package*.json .
RUN npm install --omit=dev
CMD [ "npm", "start" ]





