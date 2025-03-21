# 📚 BMS-Angular (Book Management System)  

### 🚀 Project Overview  
This repository contains a **Book Management System (BMS)** built using **Angular**. The project is now enhanced with **unit testing** and has evolved from using a JSON file as a database to a **MySQL database**.  

---

## ✅ Features Implemented  

### 🔹 **Angular Unit Testing (Completed)**
✔ **Service Testing** – Unit tests for Angular services  
✔ **Component-View Testing** – Testing TypeScript-to-View interactions  
✔ **Component-to-Component Testing** – Ensuring seamless communication between components  

### 🔹 **Backend Evolution**  
📌 **Previously:** JSON file used as a database, managed via an Express.js server  
📌 **Currently:** Replaced JSON with **MySQL database**, connected through MySQL Workbench  

---

## 📊 Database Schema (MySQL)  

### 📌 **Switch to the BMS database**
```sql
USE bms;
```

### 📖 **Tables and Relationships**  
#### 1️⃣ **Author Table**  
```sql
CREATE TABLE Author (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(50) NOT NULL
);
```

#### 2️⃣ **Category Table**  
```sql
CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    genre VARCHAR(50) NOT NULL UNIQUE
);
```

#### 3️⃣ **Book Table**  
```sql
CREATE TABLE Book (
    title VARCHAR(100) NOT NULL,
    isbn INT PRIMARY KEY,
    price INT NOT NULL,
    author_id INT,
    category_id INT,
    pubDate DATE,
    FOREIGN KEY (author_id) REFERENCES Author(author_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE SET NULL
);
```

---

## 📥 Data Insertion  

### 🖋 **Insert Authors**  
```sql
INSERT INTO Author VALUES 
(1, "Vinay"), 
(2, "Bilal"), 
(3, "Vikas"), 
(4, "Vishal");
```
```sql
SELECT * FROM Author;
```

### 📚 **Insert Categories**  
```sql
INSERT INTO Category VALUES 
(101, "Non-Fiction"), 
(102, "Biography"), 
(103, "History"), 
(104, "Fiction");
```
```sql
SELECT * FROM Category;
```

### 📘 **Insert Books**  
```sql
INSERT INTO Book (title, isbn, price, author_id, category_id, pubDate) VALUES 
("The Great Gatsby", 10001, 199, 1, 101, '1925-04-10'),
("To Kill a Mockingbird", 10002, 159, 2, 102, '1960-07-11'),
("The Art of War", 10003, 189, 3, 103, '0500-01-01'),
("Pride and Prejudice", 10004, 129, 4, 104, '1813-01-28'),
("Moby Dick", 10005, 219, 1, 101, '1851-10-18'),
("The Catcher in the Rye", 10006, 169, 2, 102, '1951-07-16'),
("War and Peace", 10007, 299, 3, 103, '1869-01-01'),
("Crime and Punishment", 10008, 249, 4, 104, '1866-01-01'),
("The Odyssey", 10009, 179, 1, 101, '0800-01-01'),
("The Hobbit", 10010, 139, 2, 102, '1937-09-21'),
("The Brothers Karamazov", 10011, 239, 3, 103, '1880-01-01');
```
```sql
SELECT * FROM Book;
```

---

## 📊 Useful Queries  

### 🔍 **Join Authors with Books**  
```sql
SELECT * FROM Book AS b 
JOIN Author AS a 
ON b.author_id = a.author_id;
```

### 🔍 **Join Books with Categories**  
```sql
SELECT * FROM Book AS b 
JOIN Category AS c 
ON c.category_id = b.category_id;
```

### 🔍 **Join Books, Authors, and Categories**  
```sql
SELECT * FROM Author AS a 
JOIN Book AS b ON a.author_id = b.author_id
JOIN Category AS c ON c.category_id = b.category_id;
```

---

## 🛠 **Git Best Practices**  

### 🚫 Remove `node_modules` from Git Tracking  
If `node_modules` was mistakenly pushed to the repository, remove it by following these steps:  

```sh
# Remove node_modules from Git tracking
git rm -r --cached node_modules

# Add node_modules to .gitignore
echo "node_modules/" >> .gitignore

# Commit and push changes
git commit -m "Removed node_modules from Git tracking"
git push origin <your-branch-name>
```
