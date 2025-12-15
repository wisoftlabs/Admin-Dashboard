import { App } from "@tinyhttp/app";
import { createApp } from "json-server/lib/app.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Item = Record<string, unknown>;
type Data = Record<string, Item[] | Item>;

const adapter = new JSONFile<Data>("db.json");
const db = new Low<Data>(adapter, {});
await db.read();

const wrapper = new App();

wrapper.use((req, _res, next) => {
  if (req.url?.startsWith("/gallery/images")) {
    req.url = req.url.replace("/gallery/images", "/images");
  }
  else if (req.url?.startsWith("/gallery/slides")) {
    req.url = req.url.replace("/gallery/slides", "/slides");
  }
  next?.();
});

const jsonServerApp = createApp(db);
wrapper.use(jsonServerApp);

wrapper.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
