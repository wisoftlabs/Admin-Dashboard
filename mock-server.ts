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
  const routeMap: Record<string, string> = {
    "/gallery/images": "/images",
    "/gallery/slides": "/slides",
    "/home/stats": "/stats",
    "/home/calendar": "/calendar",
  };

  for (const [from, to] of Object.entries(routeMap)) {
    if (req.url?.startsWith(from)) {
      req.url = req.url.replace(from, to);
      break;
    }
  }

  next?.();
});

const jsonServerApp = createApp(db);
wrapper.use(jsonServerApp);

wrapper.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
