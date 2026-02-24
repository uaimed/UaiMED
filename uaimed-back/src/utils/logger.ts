const logger = {
  info: (msg: string, data?: any) => console.log(`ℹ️  [${new Date().toISOString()}] ${msg}`, data || ""),
  error: (msg: string, err?: any) => console.error(`❌ [${new Date().toISOString()}] ${msg}`, err || ""),
  success: (msg: string, data?: any) => console.log(`✅ [${new Date().toISOString()}] ${msg}`, data || ""),
  warn: (msg: string, data?: any) => console.warn(`⚠️  [${new Date().toISOString()}] ${msg}`, data || ""),
};

export default logger;
