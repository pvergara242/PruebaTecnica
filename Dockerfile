# Stage 1 - the build process
FROM node:12.18.0 
# Versions
RUN npm -v
RUN node -v

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY . ./
RUN chmod +x ./start.sh
RUN npm install

# Stage 2 - the production environment
EXPOSE 3000
CMD ["./start.sh"]