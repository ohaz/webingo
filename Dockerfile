FROM denoland/deno:alpine


WORKDIR /app/


COPY deno.json /app/.
COPY deno.lock /app/.

RUN deno install

COPY . .

RUN deno install

RUN mkdir -p /app/client/dist/
RUN rm -rf /app/client/dist/*


CMD ["deno", "run", "--allow-net", "serve"]