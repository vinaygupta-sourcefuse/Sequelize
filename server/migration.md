
## ** Implement Migrations in Sequelize**
Migrations help **track database schema changes over time**.  

### **🔹 Step 1: Initialize Sequelize CLI**
Run this in your project folder:  
```sh
npx sequelize-cli init
```
This creates a **`migrations`** folder and a config file.

---

### **🔹 Step 2: Configure `config/config.json`**
Modify database settings inside `config/config.json`:
```json
{
  "development": {
    "username": "root",
    "password": "yourpassword",
    "database": "bms",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

---

### **🔹 Step 3: Create Migration for Books Table**
Run:  
```sh
npx sequelize-cli migration:generate --name add-phone-no-to-authors 
```
This creates a migration file inside **`migrations/`**.

---

### **🔹 Step 4: Edit the Migration File**
Open the newly generated file (`YYYYMMDDHHMMSS-create-books.js`) and edit:

```javascript
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Author", "phone_no", {
      type: Sequelize.STRING(15),
      allowNull: true, // Optional, set to false if required
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Author", "phone_no");
  },
};

```

---

### **🔹 Step 5: Run the Migration**
```sh
npx sequelize-cli db:migrate
```
 **Your database is now structured via migrations!**

## Remove the Changes

You can **undo** the migration using Sequelize CLI.

### **Step 1: Undo the Last Migration**
Run the following command to revert the last applied migration:
```sh
npx sequelize-cli db:migrate:undo
```
This will remove the `phone_no` column from the `Author` table.

### **Step 2: Undo All Migrations (if needed)**
If you want to revert **all** migrations and reset the database schema, use:
```sh
npx sequelize-cli db:migrate:undo:all
```
⚠️ **Warning:** This will remove all migrations applied to the database.
