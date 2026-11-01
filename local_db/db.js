const http = require('http');
const fs = require('fs');

const FILE = "MailList.json";

function readJsonFile() {
  try {
    const data = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(data || {});
  } catch (err) {
    return [];
  }
}

function writeJsonFile(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET") {
    const data = readJsonFile();

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ output: data }));
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      let data;

      try {
        data = JSON.parse(body);
      } catch (err) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }

      const list = [readJsonFile()];

      const now = new Date();

      const newEntry = {
        id: generateId(),
        name: data.name || "",
        email: data.email,
        tag: data.tag || "Newsletter",
        joined: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
        status: "active"
      };

      list.push(newEntry);
      writeJsonFile(list);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Saved", data: newEntry }));
    });
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});