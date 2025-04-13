import fs from "fs";
import path from "path";

export function generateModule(modelName: string) {
  const className = capitalize(modelName);
  const filePath = path.resolve(
    `src/${modelName}/module/${modelName}.module.ts`,
  );

  const lines = [
    `import { Module } from '@nestjs/common';`,
    `import { TypeOrmModule } from '@nestjs/typeorm';`,
    `import { ${className}Service } from '../service/${modelName}.service';`,
    `import { ${className} } from '../entities/${modelName}.entity';`,
    "",
    `@Module({`,
    `  imports: [TypeOrmModule.forFeature([${className}])],`,
    `  providers: [${className}Service],`,
    `  exports: [${className}Service],`,
    `})`,
    `export class ${className}Module {}`,
  ];

  fs.writeFileSync(filePath, lines.join("\n"));
  console.log(`✅ Module file for '${modelName}' generated at '${filePath}'`);
}
