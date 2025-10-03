const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const FILE_PATH = path.join(process.cwd(), "sample.log");

async function getNLastLines(filePath = FILE_PATH, N = 10) {
  const stat = await fs.stat(filePath);
  const fileSize = stat.size; // say 50 KB
  const chuckSize = 1024; // 1KB = 1024 bytes
  let buffer = "";
  let position = fileSize; // reading backwords, so start at the end
  let lines = [];

  while (position > 0 && lines.length <= N) {
    const readPosition = Math.max(0, position - chuckSize);
    const length = position - readPosition;

    const file = await fs.open(filePath, "r");
    const { buffer: chunkBuffer } = await file.read(
      Buffer.alloc(length),
      0,
      length,
      readPosition
    );
    await file.close();

    buffer = chunkBuffer.toString("utf8") + buffer;
    lines = buffer.split("\n");

    position -= chuckSize;
  }

  if (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }

  return { lines: lines.slice(-N).join("\n"), size: fileSize };
}

async function initializeWatcher(onChange, filePath = FILE_PATH) {
  const stats = await fs.stat(filePath);
  let lastSize = stats.size;

  fsSync.watch(filePath, async (eventType, fileName) => {
    if (eventType === "change") {
      const stats = await fs.stat(filePath);
      if (stats.size < lastSize) {
        lastSize = stats.size;
        return;
      }

      const length = stats.size - lastSize;
      const file = await fs.open(filePath, "r");
      const { buffer } = await file.read(
        Buffer.alloc(length),
        0,
        length,
        lastSize
      );
      await file.close();

      lastSize = stats.size;

      onChange(buffer.toString("utf8"));
    }
  });
}

module.exports = { getNLastLines, initializeWatcher };
