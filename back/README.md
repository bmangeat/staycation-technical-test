## Quick Start

```bash
# Clone the repository
git clone git@github.com:bmangeat/staycation-technical-test.git
# Create your .env from the example
# Complete the env variables (DB_USER, DB_PASSWORD)
# Look at the docker compose file ;)
cp .env.example .env

# Install dependencies
pnpm i

# Launch your app
pnpm dev
# The project will run by default on port 9000
```

## Available Scripts

In the project directory, you can run:

### `pnpm ci:check`

Use it to run the test. It will run typecheck, eslint and prettier.

## Nota bene

There is a [Bruno](https://www.usebruno.com) collection in the archive. You can open it to directly try the API.
You can install Bruno with brew on mac :)
