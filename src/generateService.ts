import fs from "fs";
import path from "path";

export function generateService(modelName: string) {
  const className = capitalize(modelName);
  const filePath = path.resolve(
    `src/${modelName}/service/${modelName}.service.ts`,
  );

  const lines = [
    `import { Injectable } from '@nestjs/common';`,
    `import { InjectRepository } from '@nestjs/typeorm';`,
    `import { Repository } from 'typeorm';`,
    `import { ${className} } from '../entities/${modelName}.entity';`,
    "",
    `@Injectable()`,
    `export class ${className}Service {`,
    `  constructor(@InjectRepository(${className}) private readonly ${modelName}Repo: Repository<${className}>) {}`,
    "",
    `  // Define your service methods here.`,
    "}",
  ];

  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(`✅ Service file for '${modelName}' generated at '${filePath}'`);
}
