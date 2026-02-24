import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
import ENV from "./config/env";

dotenv.config();

const PORT = ENV.PORT || Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  logger.success(`🚀 Backend UaiMED iniciado em http://localhost:${PORT} (env=${ENV.NODE_ENV})`);
});
