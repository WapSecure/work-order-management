# Available Scripts

## Development

| Command      | Description                             |
| ------------ | --------------------------------------- |
| `pnpm dev`   | Start development server with Turbopack |
| `pnpm build` | Build for production                    |
| `pnpm start` | Start production server                 |

## Data Management

| Command           | Description             |
| ----------------- | ----------------------- |
| `pnpm seed`       | Seed sample work orders |
| `pnpm seed:clean` | Clean and reseed data   |

## Code Quality

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm lint`         | Run ESLint                   |
| `pnpm lint:fix`     | Fix ESLint issues            |
| `pnpm format`       | Format code with Prettier    |
| `pnpm format:check` | Check code formatting        |
| `pnpm type-check`   | Run TypeScript type checking |

## Testing

| Command                | Description             |
| ---------------------- | ----------------------- |
| `pnpm test`            | Run unit tests          |
| `pnpm test:coverage`   | Run tests with coverage |
| `pnpm test:ui`         | Run tests with UI       |
| `pnpm test:watch`      | Run tests in watch mode |
| `pnpm test:e2e`        | Run E2E tests           |
| `pnpm test:e2e:ui`     | Run E2E tests with UI   |
| `pnpm test:e2e:headed` | Run E2E tests headed    |
| `pnpm test:all`        | Run all tests           |

## Git Hooks

| Command           | Description           |
| ----------------- | --------------------- |
| `pnpm prepare`    | Setup Husky git hooks |
| `pnpm pre-commit` | Run pre-commit checks |
