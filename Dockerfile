# Why this node version? Is there a specific reason you're using 14 and not the LTS?
FROM node:14

# Why are you putting this in usr?
# Your app code should probably live in its own folder on the image
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Why copy the package.json to then copy everything later?
# May as well copy everything at this point. If you were doing a multistage
# I'd get it, this is just adding space to your image for no reason.
# Remember, each layer is cached and produces size on the image
COPY . .

# Make this an arg. What if port 3000 is already in use?
# ARG PORT=3000 makes the arg default to 3000
# ENV PORT=$PORT uses the arg
# EXPOSE $PORT
EXPOSE 3000

CMD [ "npm", "start" ]