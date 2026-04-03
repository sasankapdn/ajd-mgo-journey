# Lab 5: Build Migration CLI and Migrate

## Introduction

In this lab, you'll build a simple CLI tool to migrate data from your **source AJD** to a **target AJD** (or a separate target user) to simulate a real migration. You'll run the migration and handle any basic transformations.

> **Estimated Time:** 30 minutes

**Note:** AI-generated output is non-deterministic. The instructions below first provide prompts for you to run in Cline and review the results. If you are not happy with the generated output, use the manual `[Optional]` steps in each task to complete the lab with the tested workflow.

---

### Objectives

In this lab, you will:
- Learn and experiment with using Cline to build the migration workflow
- Use a source AJD and a separate target AJD to simulate a real migration
- Build a CLI tool to transfer collections and data
- Run the migration and monitor progress
- Handle any data transformation or mapping needs

---

### Prerequisites

This lab assumes you have:
- Completed Lab 4
- Your source AJD URI from Lab 2
- A target AJD URI (created in Task 1)
- The To-Do app data in 'todos_source' collection

---

## Task 1: Provision Target AJD Instance

1. Ask Cline to summarize the target AJD provisioning steps you need to repeat from Lab 2 for the migration target environment.

```bash
add prompt: Ask Cline to summarize which Lab 2 steps must be repeated to provision a separate target AJD instance and MongoDB-enabled target user.
```

*add image: Cline response outlining the target AJD provisioning steps to repeat from Lab 2.*

2. Follow Tasks 1-3 in Lab 2 to provision a new AJD instance for the target environment and create a separate MongoDB-enabled user, for example `MONGO_USER_TARGET`.

   **Note:** This keeps source and target separate to demonstrate the migration architecture clearly. Use your existing MongoDB or the Source-AJD from Lab 2 as the source.
TargetAJD Autonomouse AI Database after following instruction in Lab 2 Task 1.
   ![Migration CLI](./images/targetajd.png)
MONGO_USER_TARGET user after following instruction in Lab 2 Task 2.
   ![Migration CLI](./images/mongousertarget.png)

3. Ensure you have the source connection string ready (from Lab 2 as `$SOURCE_MONGO_API_URL`) and provision a new one for the target as `$TARGET_MONGO_API_URL`. Follow Lab 2 Task 4 to copy the source and target MongoDB API URLs.

   ![Migration CLI](./images/mongoAPI.png)

4. Ask Cline to add the new target connection string to your `.env` file from Lab 3.

```bash
add prompt: Ask Cline to add `TARGET_MONGO_API_URL` and rename `MONGO_API_URL` to `SOURCE_MONGO_API_URL` in our root `.env` file from Lab 3.
```

*add image: Cline response showing the updated .env file.*

[Optional] Update your `.env` file manually to look like this:

   ```bash
   <copy>
   SOURCE_MONGO_API_URL='...'
   TARGET_MONGO_API_URL='...'
   </copy>
   ```

*add image: Terminal or VS Code showing both environment variables in the .env file.*

**Note:** You can terminate both AJD instances after completing the LiveLab to avoid ongoing costs.

---

## Task 2: Build the Migration CLI

**Goal:** Provide context so the AI understands the migration scope and generates a fully functioning Node.js CLI tool.

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Explicitly define the goal of building a migration CLI. Break down the requirements clearly: creating the directory, installing dependencies, handling shell arguments with Commander, displaying a progress bar, clearing out the target collection to avoid unique constraint violations, and ensuring streaming cursors are used.

Provide this prompt:

```text
Create a new directory named 'migration-cli' and initialize a Node.js project. Install 'dotenv', 'mongodb', 'commander', and 'cli-progress'. Then, create a file named 'migrate.js' that implements a migration CLI.
The CLI must:
Use 'commander' to accept --src, --tgt, --source-collection, and --target-collection arguments.
Connect to both MongoDB URIs.
To ensure it is safe to re-run, clear the target collection using 'deleteMany({})' before starting.
Use 'cli-progress' to show a progress bar while migrating documents 1:1 from source to target.
Use a cursor to handle streaming for efficiency.
Include error handling for connection issues and ensure clients are closed in a 'finally' block.
Ensure the code is compatible with Node.js v24
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

![Migration CLI Prompt](./images/ClinePrompt.png)

*This screenshot illustrates the AI planning project initialization, dependency installation, and migration script setup.*

Before acting on the plan, review it to ensure:
- It initializes the `migration-cli` properly.
- The `dotenv`, `mongodb`, `commander`, and `cli-progress` packages are included.
- It leverages streaming rather than pulling all records into memory at once.

### 3. Acting on the plan: Allowing the AI to write the code

If this plan looks good, please toggle to **Act Mode** and allow the AI to implement the migration CLI. You may be prompted to approve terminal commands like `npm init` and `npm install`.

![Migration CLI Run Command](./images/RunCommand.png)

### 4. Validating and adjusting: Testing the output and making necessary corrections

![Migration CLI Confirm](./images/Confirm.png)

*This screenshot shows the generated project files and the successful creation of `migrate.js`.* Verify that the file exists and is populated with the CLI logic.

---

## Task 3: Run the Migration

**Goal:** Run the migration script locally and perform validation of the data transfer.

*Note: When running the migration CLI, users reusing the AJD instance from previous Livelabs should ensure the source collection name matches the collection they intend to migrate. If not, the CLI may show a “successful migration” but migrate zero documents. The target collection can be any name since AJD will create it automatically.*

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Ask the AI to figure out exactly how to invoke the CLI script it just wrote. Pass along the names of the source and target collections.

```text
Generate the final `node migrate.js` command to migrate `todos_source` to `todos_target`. Ensure the command effectively passes the `SOURCE_MONGO_API_URL` and `TARGET_MONGO_API_URL` from our root `.env` to the `--src` and `--tgt` arguments.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

*add image: Cline response with the final migration command ready to run.*

*This screenshot shows the AI outlining how to start the migration script and validating the expected shell invocation.*

### 3. Acting on the plan: Allowing the AI to run the code

Accept the AI's provided command instructions or execute the CLI command directly in your terminal:

```bash
<copy>
export $(grep -v '^#' ../.env | xargs) && node migrate.js --src "$SOURCE_MONGO_API_URL" --tgt "$TARGET_MONGO_API_URL" --source-collection todos_source --target-collection todos_target
</copy>
```

**Note:** If using the same instance for simplicity, set both `--src` and `--tgt` to the same URI, but prefer separate instances for a clear demonstration.

### 4. Validating and adjusting: Testing the output and making necessary corrections

Monitor the progress bar and output. 

![Migration CLI](./images/mongo-cli-migrate.png)

*This screenshot shows the migration command running successfully, with the progress bar completed indicating the total number of documents transferred.*

---

## Optional: Reference Implementation

If you would like to proceed with the migration without running the AI prompts, you may manually create the project and copy and paste the following reference implementation.

1. In a new directory (e.g., `migration-cli`), initialize the project:
   ```bash
   <copy>
   mkdir migration-cli
   cd migration-cli
   npm init -y
   </copy>
   ```

2. Install dependencies:
   ```bash
   <copy>
   npm install dotenv mongodb commander cli-progress
   </copy>
   ```

3. Create `migrate.js` with the following code:
   ```javascript
   <copy>
   require('dotenv').config({ path: '../.env' });
   const { MongoClient } = require('mongodb');
   const { Command } = require('commander');
   const cliProgress = require('cli-progress');

   const program = new Command();

   program
     .requiredOption('--src <uri>', 'Source MongoDB URI')
     .requiredOption('--tgt <uri>', 'Target AJD URI')
     .requiredOption('--source-collection <name>', 'Source collection name')
     .requiredOption('--target-collection <name>', 'Target collection name');

   program.parse(process.argv);

   const options = program.opts();

   async function migrateCollection() {
     const srcClient = new MongoClient(options.src);
     const tgtClient = new MongoClient(options.tgt);

     try {
       await srcClient.connect();
       await tgtClient.connect();

       const srcCol = srcClient.db().collection(options.sourceCollection);
       const tgtCol = tgtClient.db().collection(options.targetCollection);

       // Clear target collection before migration to avoid unique constraint violations
       await tgtCol.deleteMany({});

       const count = await srcCol.countDocuments();
       console.log(`Migrating ${count} documents from ${options.sourceCollection} to ${options.targetCollection}`);

       const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
       bar.start(count, 0);

       const cursor = srcCol.find();
       let migrated = 0;

       while (await cursor.hasNext()) {
         const doc = await cursor.next();
         await tgtCol.insertOne(doc);
         migrated++;
         bar.update(migrated);
       }

       bar.stop();
       console.log('Migration completed successfully.');
     } catch (error) {
       console.error('Migration error:', error);
     } finally {
       await srcClient.close();
       await tgtClient.close();
     }
   }

   migrateCollection();
   </copy>
   ```

---
<!--
## Task 4: Handle Transformations (Optional)

If needed, modify the script in Task 1 (e.g., in the while loop, adjust `doc` before inserting). For this workshop, assume a simple 1:1 migration. Cline can assist with custom transformations.

---

## Troubleshooting

- **Node Version Issues:** Ensure you are using Node.js v24 or later in both the todo-app and migration-cli directories. If you encounter a SyntaxError on '??=', switch with `nvm use 24` and confirm with `node -v`. The mongodb package requires Node >=20.19.0.

- **URI Encoding:** Ensure special characters are encoded.
- **Unique Constraint Violations (ORA-00001):** If you encounter errors about unique constraints (e.g., duplicate _id), clear the target collection before migration by adding `await tgtCol.deleteMany({});` before the count and migration loop in migrate.js.
- **Large Datasets:** The cursor handles streaming for efficiency.
- **Errors:** Check connections; add logging if needed for debugging.
-->
You are now ready for Lab 6 to validate and explore.

---

## Acknowledgements

**Authors**
* **Luke Farley**, Senior Cloud Engineer, ONA Data Platform S&E

**Contributors**
* **Kaushik Kundu**, Master Principal Cloud Architect, ONA Data Platform S&E
* **Enjing Li**, Senior Cloud Engineer, ONA Data Platform S&E
* **Cline**, AI Assistant

**Last Updated By/Date:**
* **Luke Farley**, Senior Cloud Engineer, ONA Data Platform S&E, November 2025
