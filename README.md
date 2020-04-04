# contacts-app
A full REST API for a contacts app.
The contact app will have three features.
- Basic contacts management
- Contact groups
- Contacts Search

# Description
Basic contact management will include LIST, CREATE, UPDATE, DELETE actions on contact. Contact groups will have a list of contacts under them. 

**Contact entity:**
The contact entity will have the following properties.
1. Name
2. Multiple tagged Emails. Email can be with **work** tag or **personal** tag.
3. Multiple tagged phone numbers. The phone number can be with **work** tag or **personal** tag.

*Note - Each contact can have any number of phone numbers or email addresses.*

**Contact group entity:**
The contact group entity will have the following properties.
1. Name
2. List of contacts 

*Note - Each contact can be part of multiple contact groups.*

**Search:**
Appropriate API endpoints enable the consumers to search through contacts list
by Name, Email or Phone number. Search results will list the contacts matching the given search criteria, ordered by created time. Most recent contacts will be on top.

# Requirements
- Node JS
- Express JS
- MongoDB


# Installation
- Clone the repo: `https://github.com/NaveenShanmugavel18/contacts-app.git`
- Install dependencies: `npm install`
- Start the server: `npm start`
- Start the local mongodb server
- Rename the `.env.example` to `.env` to use the environment variables
- Recommended to import and use the **Contacts App - V1.postman_collection.json** file with Postman, which is located within the [*postman_collections*](https://github.com/NaveenShanmugavel18/contacts-app/tree/master/postman_collections) folder.

# API Usage
- After starting the server, perform the CRUD operations using the postman collection given in the installation section.
