FROM denoland/deno:alpine AS build

WORKDIR /app/


COPY deno.json /app/.
COPY deno.lock /app/.

RUN deno install

COPY . .

RUN deno install

RUN mkdir -p /app/client/dist/
RUN rm -rf /app/client/dist/*


RUN deno run build

FROM nginx:alpine AS serve

COPY --from=build /app/client/dist/ /usr/share/nginx/html/