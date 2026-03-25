# Lab 3: Vibe Coding the AJD Mongo To-Do App

## Introduction

To-Do App UI Screenshot Above Fold  
To-Do App UI Screenshot CRUD Actions  

Application development is rapidly evolving. Developers are no longer required to manually write every line of code or scaffold every project structure themselves. Instead, modern workflows increasingly involve collaborating with AI agents that can generate working implementations based on intent, guidance, and iterative feedback. This emerging style of development is often called **vibe coding**.

Vibe coding focuses on communicating *what you want to build* rather than typing every instruction required to build it. Developers guide the AI agent, review proposed changes, validate results, and continuously refine the application. This allows teams to move faster while still maintaining control over architecture, quality, and security.

In this lab, you will apply vibe coding techniques to build a **full-stack MongoDB-compatible To-Do application** backed by **Oracle Autonomous JSON Database (AJD)** using its MongoDB API.

The purpose of this lab goes beyond creating a simple CRUD application. It demonstrates an important architectural concept:

> Existing MongoDB development workflows and tooling can continue unchanged while Oracle AI Database provides a scalable, autonomous, enterprise-ready backend.

Using Cline as your AI development assistant, you will guide the agent to:

- create a new project workspace  
- generate backend CRUD services using Express and the MongoDB Node driver  
- configure connectivity to an AJD instance  
- produce a lightweight browser-based frontend  
- run and validate the full application locally  

This lab is intentionally **open-ended and outcome-driven**. AI-generated code is non-deterministic, meaning your implementation may differ from screenshots or examples. Image checkpoints throughout the lab act as confidence markers to help you verify that you are progressing correctly even if your exact UI layout or code structure varies.

By the end of this lab, you will have successfully vibe coded a working application that proves Mongo developers can adopt Oracle Autonomous JSON Database with minimal friction. This approach enables improved scalability, automation, and AI-ready data capabilities without requiring a full stack rewrite.

**Estimated Time:** 35 minutes

---

## Objectives

In this lab you will:

- Experiment with vibe coding using Cline  
- Scaffold a Node.js + Express + MongoDB CRUD application  
- Configure connection to AJD using MongoDB API  
- Generate a simple frontend UI  
- Run and validate the full application  

---

## Prerequisites

This lab assumes you have:

- Completed all previous labs  
- Node.js and NPM installed  
- A valid AJD MongoDB API connection string  
- VS Code with Cline extension configured  

⚐ Note:  
In this lab you must allow your AI Agent to create folders, generate files, and install dependencies.

---

## Task 1: Preparing the Workspace

*add image: VS Code terminal open*

Open a new terminal in VS Code.

Ask Cline to prepare your workspace:

```
Create a new project directory named `todo-app` and change into that directory.
```

*add image: Cline creating project directory*

If you prefer manual setup:

```bash
mkdir todo-app
cd todo-app
```

Next, guide the agent to plan the application:

```
I am building a Node.js Express MongoDB CRUD To-Do application that will connect to Oracle AJD via MongoDB API.  
Create a step-by-step development plan and list the files required.
```

*add image: Agent generated plan*

Review the plan carefully before allowing execution.

---

## Task 2: Installing Dependencies

*add image: Dependency install prompt*

Ask the agent:

```
Provide the command to install dependencies required for an Express MongoDB CRUD application.
```

You should see a response similar to:

```
npm install express mongodb
```

*add image: Dependency install result*

Manual alternative:

```bash
npm install express mongodb
```

---

## Task 3: Generating the Backend

*add image: Backend generation prompt*

Now guide the agent to create the backend service:

```
Generate an Express server with CRUD endpoints for a `todos_source` collection using the MongoDB Node driver.  
Read SOURCE_MONGO_API_URL and COLLECTION_NAME from environment variables.
```

*add image: Agent generating server*

Carefully review proposed changes before approving.

⚐ Note:  
LLMs sometimes introduce merge markers or incomplete code. If this occurs, provide feedback or manually correct files.

---

## Task 4: Configuring the Database Connection

*add image: Environment variable prompt*

Ask the agent:

```
Provide the shell command to set SOURCE_MONGO_API_URL in this terminal session.
```

Example (Mac/Linux):

```bash
export SOURCE_MONGO_API_URL='your-connection-string'
```

Example (PowerShell):

```powershell
$env:SOURCE_MONGO_API_URL="your-connection-string"
```

*add image: Environment variable confirmation*

---

## Task 5: Generating the Frontend

*add image: Creating public folder*

Ask the agent:

```
Create a public folder for frontend assets.
```

Then request UI generation:

```
Generate a simple public/index.html frontend that calls the To-Do CRUD endpoints.
```

*add image: Generated UI preview*

Your UI should allow:

- Adding todos  
- Completing todos  
- Deleting todos  

---

## Task 6: Running the Application

*add image: Run command prompt*

Ask the agent:

```
Provide the command to run this application locally and how to verify it is running.
```

Expected response:

```
node server.js
```

*add image: Server running*

Open:

```
http://localhost:3000
```

*add image: Application running*

Add and manage todos to validate CRUD functionality.

Optional verification:

```bash
curl http://localhost:3000/api/status
```

Expected result:

```
{ "status": "ok" }
```

---

## Task 7: Comparing Results

*add image: Sample UI above fold*  
*add image: Sample UI CRUD interaction*

Your generated application will be unique.

Compare:

- layout  
- endpoint behavior  
- CRUD workflow  
- responsiveness  

You may continue iterating with the agent to enhance styling or functionality.

---

## Task 8: Troubleshooting

*add image: Merge conflict example*

Common issues include:

- merge conflict markers in generated files  
- missing dependencies  
- incorrect environment variables  
- agent prematurely claiming completion  

Provide console errors or logs to guide the agent.

*add image: Agent re-prompting*

---

## Wrap-up

You have successfully vibe coded a full-stack MongoDB-compatible application powered by Oracle Autonomous JSON Database.

This demonstrates how developers can maintain familiar MongoDB tooling and workflows while leveraging AJD scalability and performance.

You may now proceed to the next lab.

---

## Acknowledgements

**Author**  
Luke Farley, Senior Cloud Engineer  

**Last Updated**  
November 2025
