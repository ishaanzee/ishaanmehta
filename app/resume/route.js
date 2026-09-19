import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const file = await readFile(path.join(process.cwd(), "public", "resume.pdf"));
  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=Ishaan-Mehta-Resume.pdf",
    },
  });
}
