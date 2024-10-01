FROM node:18-alpine AS build

RUN apk update && apk add python3 make gcc g++ protobuf-dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

RUN protoc --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
            --ts_proto_opt=esModuleInterop=true \
            --ts_proto_out="./src/generated" \
            ./src/_proto/spp_v2.proto

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
