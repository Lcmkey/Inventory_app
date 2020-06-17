require("module-alias/register");

const app = require("@services/app");
const { PORT } = require("@config/envConfig");

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
