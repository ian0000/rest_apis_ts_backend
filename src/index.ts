import server from "./server";
import colors from "colors";
console.log("🔥 index.ts reloaded at", new Date().toISOString());

const port = process.env.PORT || 4000;
console.log("🛠️  Server process starting (ts-node)");

server.listen(port, () => {
  console.log(colors.cyan.bold(`Rest API puerto ${port}`));
});
