import ejs from "ejs";
import fs from "fs";
import path from "path";
import { parseModel } from "./parser";

export async function generateResource(modelName: string, outDir?: string) {
  const className = capitalize(modelName);
  const fileName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  const fields = parseModel(modelName);

  const templates = [
    { name: "controller", out: `${fileName}.controller.ts` },
    { name: "service", out: `${fileName}.service.ts` },
    { name: "module", out: `${fileName}.module.ts` },
    { name: "create-dto", out: `dto/create-${fileName}.dto.ts` },
    { name: "update-dto", out: `dto/update-${fileName}.dto.ts` },
  ];

  const targetDir = path.join(outDir || "output", "src", fileName);
  const dtoDir = path.join(targetDir, "dto");

  fs.mkdirSync(dtoDir, { recursive: true });

  for (const tpl of templates) {
    const template = fs.readFileSync(
      path.join(__dirname, "templates", `${tpl.name}.ts.ejs`),
      "utf8",
    );
    const result = ejs.render(template, { className, fileName, fields });
    const outPath = path.join(targetDir, tpl.out);
    fs.writeFileSync(outPath, result);
    console.log(`✔ Generated: ${outPath}`);
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

