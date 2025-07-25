# 🔐 Fullstack Authify

A full-stack authentication web application built with **Spring Boot**, **React**, **Vite**, **Tailwind CSS**, and **MySQL**. It includes secure **JWT authentication**, **email verification**, and **password reset** functionality.

---

## 🚀 Tech Stack

- ⚛️ **Frontend:** React, Vite, Tailwind CSS
- ☕ **Backend:** Java, Spring Boot
- 🐬 **Database:** MySQL
- 🔐 **Auth:** JWT (JSON Web Token)
- 💡 **Tooling:** IntelliJ IDEA, VS Code

---

## ✅ Features

- 🔒 User registration & login with JWT authentication
- 📩 Email verification
- 🔁 Password reset via email link
- 👤 Protected routes with role-based access
- 🌐 Responsive UI using Tailwind CSS
- 📦 Fullstack project structured for scalability

---

## 🗂 Project Structure

fullstack-authify/
├── backend/ # Spring Boot backend (IntelliJ)
│ └── src/
│ └── main/java/in/ujjwaldas/authify/
├── frontend/ # React frontend (Vite + Tailwind)
│ └── src/
│ └── pages/, components/, context/, assets/
├── .gitignore
└── README.md



---

## ⚙️ Getting Started

### 🖥 Backend (Spring Boot + MySQL)

```bash
cd backend
# Configure database in application.properties
./mvnw spring-boot:run
```


Make sure to set your MySQL DB credentials in backend/src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret


💻 Frontend (React + Vite)
bash
Copy
Edit
cd frontend
npm install
npm run dev




