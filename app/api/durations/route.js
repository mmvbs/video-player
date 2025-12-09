import { execSync } from "child_process";
import fs from "fs";

export async function GET() {
  const dir = "./public/videos";
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mp4"));

  const results = {};

  for (const file of files) {
    const path = `${dir}/${file}`;
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of json "${path}"`
    ).toString();

    const json = JSON.parse(output);
    results[file] = parseFloat(json.format.duration);
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
