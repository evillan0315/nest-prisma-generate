
# Prisma Model Parser & Resource Generator

A TypeScript-based CLI tool that parses Prisma models and generates resource files like DTOs, services, controllers, and modules for your NestJS applications — with a generous helping of Southern charm! 🥧

---

## ✨ Features

- 🔍 Parses models from your Prisma schema
- 🧾 Extracts scalar fields and maps them to TypeScript types
- 🪄 Generates:
  - DTOs with class-validator decorators
  - NestJS Modules, Controllers, and Services (via `generateResource`)
- 🛎️ Auto-updates `AppModule` (optional)
- 👀 Watch mode to auto-generate on schema changes

---

## 📦 Installation

Clone the project and run the CLI:

```bash
git clone https://github.com/evillan0315/nest-prisma-generate.git
cd nest-prisma-generate
npm install
```

---

## 🧪 Usage

### One-Time Generation

```bash
ts-node cli.ts User
```

This generates files for the `User` model inside the default `src/` folder.

### Specify Output Directory

```bash
ts-node cli.ts User --outDir=apps/api/src
```

This places your generated files under `apps/api/src`.

### Watch Mode

```bash
ts-node cli.ts --watch
```

This will monitor `schema.prisma` for changes and generate resources for **all models** on update.

---

## 🧠 What Gets Generated?

When you run the CLI, it uses `generateResource(modelName, outDir)` to create:

- `dto/create-<model>.dto.ts`
- `dto/update-<model>.dto.ts`
- `<model>.controller.ts`
- `<model>.service.ts`
- `<model>.module.ts`

(Optionally, you can modify `cli.ts` to auto-inject the module into your `AppModule` using `updateAppModule()`.)

### Templates

The generator uses EJS templates to dynamically render the following files:

1. **Controller (`<model>.controller.ts`)**: Handles API endpoints for the model.
2. **Service (`<model>.service.ts`)**: Contains the business logic for the model.
3. **Module (`<model>.module.ts`)**: Groups the controller and service into a NestJS module.
4. **Create DTO (`dto/create-<model>.dto.ts`)**: Defines validation rules and structure for creating the model.
5. **Update DTO (`dto/update-<model>.dto.ts`)**: Defines validation rules and structure for updating the model.

These templates are located in the `templates/` directory and rendered with the fields parsed from the Prisma schema.

---

## 📁 Example Structure

```
src/
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
```

---

## 🧠 Example Prisma Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  birthdate DateTime
  posts     Post[]   // relation (excluded)
}
```

The generator will skip relational fields like `Post[]` and only include scalars in your DTOs.

---

## 🧙 Validation Magic

All DTOs are decorated with `class-validator` decorators like:

- `@IsEmail()`
- `@IsString()`
- `@IsOptional()`
- `@IsDate()`
- `@IsInt()`
- ...with sweet, Southern-style error messages like:
  > `"Email must be a valid email address, sweetpea."`

---

## 🧵 CLI Reference

| Argument         | Description                                  |
|------------------|----------------------------------------------|
| `modelName`      | Prisma model name (e.g., `User`)             |
| `--outDir=...`   | Output directory for generated files         |
| `--watch`        | Watch `schema.prisma` and auto-generate      |

---

## 📦 Project Information

### `package.json` Overview

- **Name**: nest-prisma-generator
- **Version**: 1.0.0
- **Main entry**: `index.js`
- **License**: ISC

### Scripts

- `start`: Runs the CLI tool with a specified model.
- `start:watch`: Runs the CLI tool in watch mode to monitor schema changes.
- `format`: Formats the source code using Prettier.

### Dependencies

- **`@nestjs/swagger`**: Swagger integration for NestJS.
- **`chokidar`**: File watcher for watching `schema.prisma`.
- **`class-transformer`**: Transforms objects to and from different classes.
- **`class-validator`**: Validation decorators for DTOs.
- **`swagger-ui-express`**: Serves Swagger UI for NestJS.

### DevDependencies

- **`@types/ejs`**: Type definitions for EJS.
- **`@types/node`**: Type definitions for Node.js.
- **`ejs`**: Template engine used for rendering files.
- **`ts-node`**: TypeScript execution environment for Node.js.
- **`typescript`**: TypeScript language support.
- **`prettier`**: Code formatter for consistent formatting.
- **`@nestjs/cli`**: NestJS CLI for project setup.

---

## 🧑‍💻 Author

Made with love by [Eddie Villanueva](https://github.com/evillan0315)  
💌 [evillan0315@gmail.com](mailto:evillan0315@gmail.com)

---

## 🪵 Future Ideas

- ✅ Automatic `AppModule` injection
- 🔐 Auth scaffolding
- 📜 Swagger decorators
- 📁 Automatic file system integration for new resources
- 💬 i18n-friendly error messages

---

If this lil' tool saves you time, go ahead and ⭐ it, sugar! And if you’ve got ideas to improve it, y’all know where to find me.



