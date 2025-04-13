import fs from "fs";
import path from "path";

export function generateController(modelName: string) {
  const className = capitalize(modelName);
  const filePath = path.resolve(
    `src/${modelName}/controller/${modelName}.controller.ts`,
  );

  const lines = [
    `import { Controller, Get, Post, Body } from '@nestjs/common';`,
    `import { ${className}Service } from '../service/${modelName}.service';`,
    `import { ${className}Dto } from '../dto/create-${modelName}.dto';`,
    `import { Update${className}Dto } from '../dto/update-${modelName}.dto';`,
    "",
    `@Controller('${modelName}')`,
    `export class ${className}Controller {`,
    `  constructor(private readonly ${modelName}Service: ${className}Service) {}`,
    "",
    `  @Post()`,
    `  create(@Body() create${className}Dto: ${className}Dto) {`,
    `    return this.${modelName}Service.create(create${className}Dto);`,
    `  }`,
    "",
    `  @Get()`,
    `  findAll() {`,
    `    return this.${modelName}Service.findAll();`,
    `  }`,
    "}",
  ];

  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(
    `✅ Controller file for '${modelName}' generated at '${filePath}'`,
  );
}
