# Lab 2: Provision and Connect to AJD

## Introduction

In this lab, you'll provision an Oracle Autonomous JSON Database (AJD) instance and enable its MongoDB-compatible API. This allows your MongoDB applications to connect seamlessly, treating AJD as a drop-in replacement.

> **Estimated Time:** 15 minutes

**Note:** This lab is required unless you already have an Autonomous JSON Database (AJD) with the MongoDB API enabled. If you already have one, you can reuse it and skip provisioning.

**Note:** Cline can help automate provisioning scripts or troubleshoot connection issues—let me know if you need assistance!

---

### Objectives

In this lab, you will:
- Create an AJD instance in Oracle Cloud
- Enable the MongoDB API
- Obtain the connection string for your app

---

### Prerequisites

This lab assumes you have:
- Completed Lab 1 (if chosen)
- An active Oracle Cloud account with permissions to create databases

---

## Task 1: Provision AJD Instance

1. Log in to the Oracle Cloud Console and Click Navigation Menu.

![Navingation Memu](./images/oci-hamburger.png)

2. Navigate to **Oracle Database > Autonomous AI Database**.

![Autonomous AI Database](./images/ai-database.png)

3. Click **Create Autonomous Database**.

![Create Autonomous Database button](./images/AIDatabaseCreate.png)

4. Rename Display name as **ajd-mongo-todo** 
```bash
<copy>
ajd-mongo-todo 
</copy>
```
Rename Database name as **ajdmongotodo**
```bash
<copy>
ajdmongotodo 
</copy>
```
Select **JSON Database** as the workload type.

![AJD Mongo Todo](./images/ajd-mongo-todo.png)


5. Set admin password and configure network access. Set access type to 'Secure access from allowed IPs and VCNs only' (add your IP to the ACL for security).

![Access ACL](./images/ajd-acl.png)

Switch on “Add my IP address” -> That’ll directly include your IP Address in the ACL.

![Add My IP](./images/ajd-public-ip.png)

If you’re not sure from where you will want to connect from, you can change the IP notation type field to CIDR block, and enter a value of 0.0.0.0/0. That will allow you to connect from anywhere, but naturally you should only use that for testing.

**Note** Alternatively, to get your public ip address, you can go to whatismyipaddress.com, or run the following command

```bash
<copy>
curl -s ifconfig.me
</copy>
```

6. Click **Create**.

Wait for the instance to provision (a few minutes).

## Task 2: Create Mongo User 

1. Navigate to Database Users in Autonomous AI Database  

![Database Users](./images/database-user.png)

2. Select Create User 

![Create User](./images/create-user.png)

3. Create new user e.g. **MONGO_USER** with associated password. Set Quota on tablespace to **UNLIMITED** and enable REST, GraphQL, MongoDB API, and Web access.

![Create Mongo User](./images/mongo-user-1.png)
<!--
4. In the **Granted Roles** tab, verify the user has the **CONNECT** and **RESOURCE** roles.
   - In many tenancies these are granted by default when creating the user.
   - If they are missing, add them.

![Grant User Roles](./images/mongo-user-2.png)
-->
* **Note** For more details on creating users for MongoDB, see [User Management for MongoDB](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/mongo-using-oracle-database-api-mongodb.html#GUID-613DD3CE-6E84-4D8E-B614-2CFC18A41784)

## Task 3: Test mongo_user and SQL Connection.

1. Go Back to ajd-mongo-todo database information page and click Database Connections
![Database Users](./images/DatabaseConn.png)

2. Click Download wallet Button
![Database Users](./images/DownloadWallet.png)

3. Please create a password for this wallet. Some database clients will require that you provide both the wallet and password to connect to your database (other clients will auto-login using the wallet without a password).

![Database Users](./images/DownloadWalletwithPWD.png)

4. Go Back to SQL Developer VS Code Extension and Click create connection

![Database Users](./images/VSDBConn.png)

5. Enter Connection Name, Enter Username as ``` mongo_user```, password for mongo_user, Click Connection Type as Cloud Wallet, Click Choose File and give downloaded wallet zip file loction, Click Service type as AJSMONDOTODO_MEDIUM, and Click Test Button.

![Database Users](./images/VSDNConfig.png)

5. You can see Test succesfully passed for connection.

![Database Users](./images/VSDBConnPass.png)

6. Save Connection by clicking Save Button.

![Database Users](./images/VSDNConnSave.png)

6. Also, you can View Connection and Expand to view all objects from SQL Extension.

![Database Users](./images/VSDBConnView.png)

## Task 4: Enable MongoDB API

1. In the AJD details page, go to **Tool Configuration**.

![Tool Configuration](./images/ToolConfig.png)


2. Scroll down, and Under **MongoDB API** set the status to Enabled.

![Enable Access](./images/MongoDBStatus.png)


### Formatting the connection string (recommended)

1. Copy the connection string from the OCI Console and paste it into a text editor.
2. Replace placeholders:
   - Replace `<user>` with your database username (for example, `mongo_user`).
   - Replace `<hostname>` with the hostname shown in the console.
   - Replace `<password>` with your password, URL-encoded.

> **Tip (Cline prompt):**
> "Given username `mongo_user`, password `pass@word#1`, and hostname `<paste-hostname>`, URL-encode the password and output a final working MongoDB connection string. Output only the final string."

When setting env variable

```bash
I need to URL encode the special characters in the provided password and then replace the placeholders in the MongoDB connection string with the username and encoded password. Let's break this down step-by-step.
First, I have the username "mongo_user" and the password "pass@word#1". The special characters in the password (@ and #) need to be URL encoded. I know that @ becomes %40 and # becomes %23 in URL encoding. So, the encoded password should be "pass%40word%231".
Next, I need to insert the username and encoded password into the connection string where it shows [user.password@] and also replace [user] in the database name part of the string. The connection string is: mongodb://[user:password@]IJEGQEYUI1CWVRQ-
AJDMONGOTODO.adb.us-ashburn-1.oraclecloudapps.com:27017/[user]? authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=fals
e&loadBalanced=true
I will replace [user.password@] with "mongo_user:pass%40word%231@" and [user] with "mongo_user". This should give me the final connection string.
Since the task is to output the result to the Cline window, I don't need to write to a file or execute a command. I can directly present the result using the attempt_completion tool.
Let me confirm the encoded password and the replacements:
Username: mongo_user
• Password: pass@word#1
• Encoded Password: pass%40word%231
Replace [user:password@] with mongo_user:pass%40word%231@ Replace [user] with mongo_user
The final connection string should be:
mongodb://mongo_user:pass%40word%231@IJEGQEYUI1CWVRQ-
AJDMONGOTODO.adb.us-ashburn-
1.oraclecloudapps.com:27017/mongo_user?
authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=fals
e&loadBalanced=true
</copy>
```

*  If human steps and images you  will need to copy the connection string. 
Then ask them to past in notepad. Then explicitly show them what to paste in, you have defined the user as mongo_user, yet your instructions do not paste that into string you reference as <user>. Second your syntax showing the connection string format in current state is missing the machine name.  This will lead to issues for newer users later in the lab if this is not very clear and explicit. 

* Example: Copy from the console the connect string and paste into notepad. 

![Cline Access](./images/ClineConvertAPI.png)

Replace placeholders with your details. URL-encode special characters in the password, e.g., '@' as %40, '#' as %23, '/' as %2F, and ':' as %3A. For example, if your password is 'pass@word#1', encode it as 'pass%40word%231'. Always use single quotes around the full string when exporting as an environment variable to avoid shell interpretation.

The connection string format is:
```bash
<copy>
mongodb://<user>:<password>@<hostname>:27017/<user>?authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=false&loadBalanced=true
</copy>
```


You are now ready for Lab 3 to build the To-Do app.

## Troubleshooting

- **Connection Errors:** If you encounter errors like ECONNRESET during TLS handshake, ensure your IP is added to the ACL and you're not on a VPN that interferes with external connections. Test connectivity with `openssl s_client -connect <hostname>:27017 -quiet`.

- **Connection String:** Double-check URL-encoding (e.g., '@' as %40) and use single quotes when setting environment variables.

---

## Acknowledgements

**Authors**
* **Luke Farley**, Senior Cloud Engineer, ONA Data Platform S&E

**Contributors**
* **Kaushik Kundu**, Master Principal Cloud Architect, ONA Data Platform S&E
* **Cline AI** 

**Last Updated By/Date:**
* **Luke Farley**, Senior Cloud Engineer, ONA Data Platform S&E, November 2025
