# Lab 4: Mongo Vibe Assist Migration Lab

## Introduction

In this lab, you will apply vibe coding techniques to build `MongoVibeAssist_Migrator`, a professional, Node.js-based CLI tool designed to perform a full automation and demonstration of migrating a MongoDB database to an Oracle Autonomous JSON Database (AJD). 

Rather than modifying your application code, you will use this tool to discover the source database schema, migrate all data efficiently in batches, replicate the indexes to AJD, and validate the migration with a seamless demonstration that swaps connection strings to prove full compatibility.

Just like in Lab 3, you will guide the AI assistant through a sequence of development sprints. 

We will follow this 4-step workflow:
1. **Planning**: Crafting the prompt.
2. **Reviewing the plan**: Checking the AI's proposed implementation.
3. **Acting on the plan**: Allowing the AI to write the code.
4. **Validating and adjusting**: Testing the output and making necessary corrections.

> **Estimated Time:** 35 minutes

---

## Objectives

In this lab you will:
* Run structured AI-assisted development sprints for a Node.js application.
* Build the `MongoVibeAssist_Migrator` tool using the official `mongodb` npm package.
* Build discovery, data migration, and index replication logic.
* Implement explanatory logging designed for live demonstrations.

---

## Prerequisites

This lab assumes you have:
* Completed Lab 3.
* Node.js v24+ installed.
* Source MongoDB URI and Target AJD URI defined in a root `.env` file (e.g. `SOURCE_MONGO_API_URL` and `TARGET_MONGO_API_URL`).
* VS Code with your Agent configured.

---

## Task 1: Provision Target AJD Instance

1. Ask the AI assistant to summarize the target AJD provisioning steps you need to repeat from Lab 2 for the migration target environment.

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

4. Add the original `MONGO_API_URL` as `SOURCE_MONGO_API_URL` and the new connection string as `TARGET_MONGO_API_URL` to the `.env` file created in Lab 3.

---

## Task 2: Sprint 0 — Grounding the AI Session

**Goal:** Provide context so the AI understands the architecture, persona, and the Product Definition Document for the migration tool.

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Start by giving the AI context on the persona, architecture, and end goals by passing the Development Plan concepts.

Provide this grounding prompt to set the context of the new project:

```text
Hi, we are starting a new lab. Use the `migration-cli` folder as the workspace.

We are building a Node.js CLI application called `MongoVibeAssist_Migrator`. The backend connects to an Oracle Autonomous JSON Database via the Mongo API.

Here is the Product Definition Document & Development Plan for context:

**Product Definition:** 
Migrate Data: Move JSON documents and indexes from a source MongoDB to a target Oracle AJD.
Demonstrate: Allow the original MongoDB application to run unchanged against AJD by simply swapping its connection string. Demonstration-First Logging: Output must be verbose and explanatory, to be read by a live audience (e.g. "== STEP 1: CONNECTING TO SOURCE MONGODB ==", "-> Why: We must connect...").

**Sprints & Tech Stack:**
Use `mongodb`, `commander`, `cli-progress`, `dotenv`. 
Sprint 1: Connectivity & Discovery (package.json, connect.js, discover.js parsing schemas and counts).
Sprint 2: Core Data Migration (migrate.js batch-reading/insert_many for a single collection).
Sprint 3: Full Migration & Indexing (looping all collections, replicating index schemas, robust failure handling).
Sprint 4: Validation & Demo Prep (validate.js counts comparison table, outputting final connection string, complete README.md).

Please acknowledge the tech stack, narrative goals, and confirm readiness for Sprint 1.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

*This screenshot shows the AI summarizing the technical stack, acknowledging the focus on demonstration-friendly logging, and preparing for Sprint 1.*

![Sprint 0 Planning Screenshot](./images/lab4-task1-plan.png)

### 3. Acting & Validating

Verify the AI clearly understands the requirement to build this in Node.js using the official `mongodb` npm package.

---

## Task 3: Sprint 1 — Connectivity & Discovery

**Goal:** Initialize the Node.js environment, connect to the databases, and discover the MongoDB collections and index definitions.

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Ask the AI to build the project foundation by initializing the package and creating the connectivity logic.

Provide this prompt to start development:

```text
Let's kick off Sprint 1! 

Please run `npm init -y`, install `mongodb`, `dotenv`, and `commander`. Set up our CLI skeleton. 

Build a `connect.js` module to securely load `SOURCE_MONGO_API_URL` and `TARGET_MONGO_API_URL` from our root `../.env` file. Then, create a `discover.js` module that connects to the source MongoDB, lists all collections, calculates their document counts, and fetches their index definitions. 

Finally, write simple passing unit tests for the connectivity module.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

![Sprint 1 Planning Screenshot](./images/lab4-task2-plan.png)

The AI will propose creating the package.json, connection handler, and discovery module.

Before acting on the plan, review it to ensure:
- The script correctly utilizes the `.env` variables from outside the folder.
- `mongodb` is specified as the connection driver.

### 3. Acting on the plan: Allowing the AI to write the code

Toggle to **Act Mode** and execute the plan. You will be prompted to approve terminal commands creating the package.json and installing dependencies.

### 4. Validating and adjusting: Testing the output and making necessary corrections

![Sprint 1 Result Screenshot](./images/lab4-task2-act.png)

Ensure the output is clean. You can manually run the `discover.js` script (or `node main.js` depending on the AI's scaffolding) to verify it successfully pings your MongoDB and lists the collections.

---

## Task 4: Sprint 2 — Core Data Migration

**Goal:** Handle the data transfer efficiently for a single collection before attempting the whole database.

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Challenge the AI to build the core batch data transfer script for just a single collection first, enforcing explanatory logging.

```text
Great! Moving to Sprint 2.

Implement `migrate.js`. Add CLI arguments via commander allowing me to specify a single collection to migrate as a test. 

Implement efficient batch-reading from the MongoDB source, and batch-writing using `insertMany` into the Oracle AJD target. Be sure to add clear, verbose demo-style logging (e.g., "Wrote batch 1/10...", "-> Why: Batching ensures memory efficiency"). 

Write a unit test for this step mocking the mongodb clients to test the batch read/write logic.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

![Sprint 2 Planning Screenshot](./images/lab4-task3-plan.png)

### 3. Acting on the plan: Allowing the AI to write the code

Review the newly created data structures, and click to approve writing `migrate.js`.

### 4. Validating and adjusting: Testing the output and making necessary corrections

![Sprint 2 Result Screenshot](./images/lab4-task3-act.png)

---

## Task 5: Sprint 3 — Full Migration & Indexing

**Goal:** Scale the script to migrate all collections autonomously and migrate their metadata (indexes).

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Ask the AI to expand the script into a loop across all collections and implement schema index replication.

```text
We are on Sprint 3! 

Modify `migrate.js` to loop through all collections returned by our `discover.js` plan. After data is migrated, implement the index replication module: read the index definitions from discovery and duplicate them into AJD using standard index creation commands.

Refine all the console logging during this loop so it is heavily explanatory for a live audience. Make sure to add robust error handling in case a batch fails to insert, logging the issue gracefully.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

![Sprint 3 Planning Screenshot](./images/lab4-task4-plan.png)

Verify that the index replication uses the standard MongoDB index APIs which are supported natively by Oracle AJD.

### 3. Acting on the plan: Allowing the AI to write the code

Toggle to Act mode and let the AI finish the core looping functionality. 

### 4. Validating and adjusting: Testing the output and making necessary corrections

![Sprint 3 Result Screenshot](./images/lab4-task4-act.png)

---

## Task 6: Sprint 4 — Validation & Demo Prep

**Goal:** Ensure data integrity by counting documents across systems, output the final connection strings, and finalize documentation.

### 1. Planning: Crafting the prompt

*How to construct this prompt:* Instruct the AI to finish the tool by building validation logic and configuring the final demo presentation script.

```text
Final stretch, Sprint 4!

Implement the `validate.js` module. It should run `countDocuments` on both the source DB and the target DB, and then print a beautiful comparison summary table confirming 100% data transfer. 

Add the Demo Configuration Helper step at the very end of the script to output: "SUCCESS! Switch your application to this Target Connection String: <TARGET_MONGO_API_URL>".

Finally, write the `README.md` outlining the "Demo Show Script" format from my original plan (Act 1 through Act 5) so the presenter knows exactly how to demo this tool.
```

### 2. Reviewing the plan: Checking the AI's proposed implementation

![Sprint 4 Planning Screenshot](./images/lab4-task5-plan.png)

### 3. Acting on the plan: Allowing the AI to write the code

Let the AI create the validation scripts and the final README.md.

### 4. Validating and adjusting: Testing the output and making necessary corrections

![Sprint 4 Result Screenshot](./images/lab4-task5-act.png)

You can now fully execute your tool:

```bash
node main.js --run-all
```

Watch the demonstration-first logging output to the terminal, and view the validation summary table confirming all your data successfully reached Oracle AJD.

---

## Optional: Reference Implementation

If you would like to proceed without running the AI prompts, you may manually create and run the base migration script from previous iterations. The `migrate.js` implementation (from prior labs) also satisfies core data transfer:

1. In a new directory, initialize the project:
   ```bash
   mkdir migration-cli
   cd migration-cli
   npm init -y
   npm install dotenv mongodb commander cli-progress
   ```

2. Create `migrate.js` with the following fallback code to handle streaming migrations:
   ```javascript
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

       await tgtCol.deleteMany({});
       const count = await srcCol.countDocuments();
       console.log(`Migrating ${count} docs`);

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
   ```

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
