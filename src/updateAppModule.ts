import fs from "fs";
import path from "path";

export function updateAppModule(modelName: string, outDir: string = "src") {
  const className = capitalize(modelName);
  const sourcePath = path.join(outDir, 'src', 'app.module.ts');
  const destinationPath = path.join(outDir, 'generated', 'app.module.ts');
  // Paths
  const sourceAppModulePath = path.resolve(sourcePath);
  const targetAppModulePath = path.resolve(destinationPath);
  
  

  // Create the output directory if it doesn't exist
  fs.mkdirSync(outDir, { recursive: true });

  // Copy app.module.ts if it doesn't exist in the outDir
  if (!fs.existsSync(targetAppModulePath)) {
    fs.copyFileSync(sourceAppModulePath, targetAppModulePath);
    console.log(`📄 Copied app.module.ts to "${outDir}"`);
  }

  const importPath = path
    .relative(path.dirname(targetAppModulePath), path.resolve(outDir, modelName, "module", `${modelName}.module`))
    .replace(/\\/g, "/")
    .replace(/\.ts$/, "");

  const importLine = `import { ${className}Module } from './${importPath}';`;
  const addToImports = `    ${className}Module,`;

  let content = fs.readFileSync(targetAppModulePath, "utf8");

  // Prevent duplicate imports
  if (content.includes(importLine)) {
    console.log(`🔁 AppModule already includes ${className}Module.`);
    return;
  }

  // Inject import line
  content = importLine + "\n" + content;

  // Inject module into the imports array
  content = content.replace(/imports:\s*\[((.|\s)*?)\]/, (match, modules) => {
    return `imports: [\n${addToImports}\n${modules}\n  ]`;
  });

  fs.writeFileSync(targetAppModulePath, content);
  console.log(`✅ AppModule updated with ${className}Module.`);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

