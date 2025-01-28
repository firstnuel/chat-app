FROM node@sha256:330fa0342b6ad2cbdab30ac44195660af5a1f298cc499d8cbdf7496b02ea17d8

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

RUN npm i -g serve

CMD serve -s dist

