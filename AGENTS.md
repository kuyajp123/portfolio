# Project Guidelines & Security Rules

## 1. Strict Prohibition on Reading `.env` Files

- NEVER read, view, grep, cat, or inspect the contents of any `.env` files (including `.env`, `.env.local`, `.env.production`, `.env.development`, `.env.test`, or similar secret files).
- Treat all `.env` and secret files as strictly confidential.
- If environment variables are needed, instruct the user to configure them or document them in `.env.example`.

## 2. No Hardcoded Fallback Credentials in Code

- When accessing environment variables (e.g., `import.meta.env.*`, `process.env.*`), NEVER add hardcoded keys, secrets, tokens, or personal identifiers as fallback values.
- FORBIDDEN:
  ```typescript
  // NEVER DO THIS:
  const API_KEY = (import.meta.env.VITE_API_KEY as string) ?? '35d378ba4a6c52e7b0710e7b919a3373';
  ```
- REQUIRED:

  ```typescript
  // Clean, non-secret fallback:
  const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined) ?? '';
  ```

  or

  ```typescript
  // Clean, non-secret fallback:
  const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined) ?? process.env.VITE_API_KEY ?? '';
  ```

- add validation to ensure that the environment variable is set and not empty, throwing an error if it is missing or invalid.
- Fallbacks are only permitted for non-sensitive configuration defaults (e.g., empty string `""`, `process.env.PORT ?? 3000`), never for credentials, API keys, or private identifiers.
