const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { initializeWatcher, getNLastLines } = require("./helpers");

const PORT = 3000;

const HTML_PATH = path.join(process.cwd(), "index.html");

const server = http.createServer((req, res) => {
  fs.readFile(HTML_PATH, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });

wss.on("error", console.error);

wss.on("connection", async function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  const { lines: lastLines } = await getNLastLines();
  lastLines.split("\n").forEach((line) => {
    ws.send(line);
  });

  initializeWatcher((lastLines) => {
    lastLines.split("\n").forEach((line, i) => {
      ws.send(line);
    });
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
