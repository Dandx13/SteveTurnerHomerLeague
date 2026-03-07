const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "hr-events.json");

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function main() {
  console.log("Starting HR data updater...");

  const data = loadJson(DATA_FILE);

  if (!data || typeof data !== "object") {
    throw new Error("hr-events.json is not a valid object.");
  }

  if (!Array.isArray(data.events)) {
    throw new Error("hr-events.json must contain an events array.");
  }

  data.updatedAt = new Date().toISOString();

  saveJson(DATA_FILE, data);

  console.log(`Updated ${DATA_FILE}`);
  console.log(`Season: ${data.season}`);
  console.log(`Event count: ${data.events.length}`);
  console.log(`updatedAt: ${data.updatedAt}`);
}

try {
  main();
} catch (error) {
  console.error("HR updater failed:");
  console.error(error);
  process.exit(1);
}
