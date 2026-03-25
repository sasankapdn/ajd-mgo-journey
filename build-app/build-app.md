# Lab 3: Vibe Coding the AJD Mongo To-Do App

## Introduction

To-Do App UI Screenshot Above Fold
*This screenshot shows the final To-Do application layout that you will build by the end of the sprints. Use it as a visual success target.*

To-Do App UI Screenshot CRUD Actions
*This screenshot highlights completing and deleting todos, demonstrating the full CRUD workflow that you will implement.*

Modern developers are increasingly using AI agents to accelerate application development. Instead of writing every file manually, developers can now guide intelligent tooling to scaffold projects, generate working code, and iterate quickly. This emerging workflow is often referred to as **vibe coding** — a collaborative development approach where the developer focuses on intent, architecture, and validation while the AI assists with implementation.

In this lab, you will apply vibe coding techniques to build a full-stack MongoDB-compatible To-Do application backed by **Oracle Autonomous JSON Database (AJD)** using its MongoDB API.

The goal is not just to build a simple CRUD application. It demonstrates a key architectural concept:

> Existing MongoDB development patterns can continue unchanged while Oracle AI Database provides a scalable, autonomous backend.

You will guide the AI assistant through a sequence of **development sprints**, each representing a focused milestone in building the application.

By the end of this lab, you will have vibe coded a complete source application that will later be migrated in the next lab.

**Estimated Time:** 35 minutes

---

## Objectives

In this lab you will:

* Run structured AI-assisted development sprints
* Build a Node.js + Express MongoDB CRUD backend
* Generate a browser-based UI
* Connect the application to AJD
* Validate end-to-end functionality

---

## Prerequisites

This lab assumes you have:

* Completed previous labs
* Node.js and npm installed
* An AJD MongoDB API connection string
* VS Code with Cline configured

---

## Task 1: Sprint 0 — Grounding the AI Session

**Goal:** Provide context so the AI understands the persona and architecture.

**Prompt**

Provide this grounding prompt:

```
Hi Cline, we are starting a new lab.

We are building a Node.js To-Do CRUD application.

The persona is a MongoDB developer building from scratch.
However, the backend database will be Oracle Autonomous JSON Database using its MongoDB API.

We will build this application in structured development sprints.
Please acknowledge and confirm readiness for Sprint 1.
```

**Planning Screenshot**

Sprint 0 Planning Screenshot
*This screenshot shows the AI summarizing the development approach and confirming understanding of the Mongo developer persona and AJD backend.*

**Result Screenshot**

Sprint 0 Result Screenshot
*This screenshot confirms the AI has acknowledged the sprint structure and is ready to proceed.*

---

## Task 2: Sprint 1 — Project Setup and AJD Connection

**Prompt**

```
Sprint 1

Initialize a new Node.js project and install express and mongodb.

Create a server.js file with an Express server listening on port 3000.

Add MongoDB connection logic using MongoClient.
Read the connection string from environment variable MONGO_API_URL.

Create an async connectDB function that connects and pings the admin database.
Call this function during server startup.

Create a global db variable accessible by routes.

Add express.json middleware.

This should prepare us for Sprint 2
```

**Planning Screenshot**

Sprint 1 Planning Screenshot
*This screenshot illustrates the AI planning project initialization, dependency installation, and database connection setup.*

**Result Screenshot**

Sprint 1 Result Screenshot
*This screenshot shows the generated project files and a successful AJD connection message in the terminal.*

---

## Task 3: Sprint 2 — Create and Read (C, R)

**Prompt**

```
Add GET /api/todos route returning db.collection('todos').find().toArray().

Add POST /api/todos route that inserts a todo with fields text and completed:false.

Create a public folder and index.html file.

Serve static files using express.static.

Generate a simple UI with:
- heading
- input field
- add button
- unordered list

Add frontend JavaScript that fetches todos and renders them.
```

**Planning Screenshot**

Sprint 2 Planning Screenshot
*This screenshot shows the AI outlining API route creation and frontend UI generation steps.*

**Result Screenshot**

Sprint 2 Result Screenshot
*This screenshot displays the running UI where new todos can be added and listed.*

---

## Task 4: Sprint 3 — Update, Delete and Polish

**Prompt**

```
Import ObjectId from mongodb.

Add DELETE /api/todos/:id route removing document by _id.

Add PUT /api/todos/:id route updating completed:true.

Update frontend to add Complete and Delete buttons.
Buttons should call the PUT and DELETE endpoints.
```

**Planning Screenshot**

Sprint 3 Planning Screenshot
*This screenshot captures the AI describing enhancements to support update and delete functionality.*

**Result Screenshot**

Sprint 3 Result Screenshot
*This screenshot shows completed todos being visually updated and removed from the list.*

---

## Task 5: Sprint 4 — Run and Validate

**Prompt**

```
Provide the command to run the server locally and how to verify application health.
```

**Planning Screenshot**

Sprint 4 Planning Screenshot
*This screenshot shows the AI outlining how to start the server and validate endpoints.*

**Result Screenshot**

Sprint 4 Result Screenshot
*This screenshot confirms the application is accessible in the browser and CRUD actions are functioning.*

Open:

[http://localhost:3000](http://localhost:3000)

Create, complete, and delete todos.

---

## Optional: Use Pre‑Generated Artifacts

If you would like to proceed to the next lab without running the AI prompts, you may copy and paste the following reference implementation.

### server.js

```javascript
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const uri = process.env.MONGO_API_URL;
let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log('Connected to AJD');
}

app.get('/api/todos', async (req, res) => {
  const todos = await db.collection('todos').find().toArray();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = { text: req.body.text, completed: false };
  await db.collection('todos').insertOne(todo);
  res.json({ status: 'ok' });
});

app.put('/api/todos/:id', async (req, res) => {
  await db.collection('todos').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { completed: true } }
  );
  res.json({ status: 'ok' });
});

app.delete('/api/todos/:id', async (req, res) => {
  await db.collection('todos').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ status: 'ok' });
});

connectDB().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
```

### public/index.html

```html
<!DOCTYPE html>
<html>
<head>
<title>To‑Do App</title>
</head>
<body>
<h1>Todos</h1>
<input id="todoInput" />
<button onclick="addTodo()">Add</button>
<ul id="list"></ul>

<script>
async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `${t.text}
      <button onclick="completeTodo('${t._id}')">Complete</button>
      <button onclick="deleteTodo('${t._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function addTodo() {
  const text = document.getElementById('todoInput').value;
  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  loadTodos();
}

async function completeTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'PUT' });
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  loadTodos();
}

loadTodos();
</script>
</body>
</html>
```

---

## Wrap‑up

You have successfully vibe coded a complete MongoDB‑compatible application powered by Oracle Autonomous JSON Database.

This application will serve as the **source system** for the migration lab.

You may now proceed to Lab 4.

---

## Acknowledgements

Author
Luke Farley

Last Updated
November 2025
