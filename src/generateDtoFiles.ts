import fs from "fs";
import path from "path";
import { parseModel, ParsedField } from "./parser";

export function generateDtoFiles(modelName: string, outputDir = "src/dto") {
  const fields = parseModel(modelName);

  const className = capitalize(modelName);
  const dtoDir = path.resolve(outputDir);
  if (!fs.existsSync(dtoDir)) fs.mkdirSync(dtoDir, { recursive: true });

  const createDto = generateDtoClass(fields, `${className}Dto`, false);
  const updateDto = generateDtoClass(fields, `Update${className}Dto`, true);

  fs.writeFileSync(
    `${dtoDir}/create-${modelName.toLowerCase()}.dto.ts`,
    createDto,
  );
  fs.writeFileSync(
    `${dtoDir}/update-${modelName.toLowerCase()}.dto.ts`,
    updateDto,
  );

  console.log(`✅ DTOs for '${modelName}' created at '${dtoDir}'`);
}

function generateDtoClass(
  fields: ParsedField[],
  className: string,
  allOptional: boolean,
): string {
  const lines: string[] = [];

  lines.push(`import { ApiProperty } from '@nestjs/swagger';`);
  lines.push(
    `import { ${collectUniqueValidators(fields).join(", ")} } from 'class-validator';\n`,
  );

  lines.push(`export class ${className} {`);

  for (const field of fields) {
    const tsType = allOptional ? `${field.tsType} | undefined` : field.tsType;
    const optional = allOptional || field.isOptional;

    const apiPropertyLine = `  @ApiProperty({ required: ${!optional} })`;
    const validationLines = field.validators.map((v) => `  ${v}`).join("\n");

    lines.push(apiPropertyLine);
    lines.push(validationLines);
    lines.push(`  ${field.name}${optional ? "?" : ""}: ${tsType};\n`);
  }

  lines.push(`}`);

  return lines.join("\n");
}

function collectUniqueValidators(fields: ParsedField[]): string[] {
  const set = new Set<string>();
  fields.forEach((f) => {
    f.validators.forEach((v) => {
      const decoratorName = v.match(/@(\w+)/)?.[1];
      if (decoratorName) set.add(decoratorName);
    });
  });
  return Array.from(set);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
