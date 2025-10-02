# Assignment

This project is a **full‑stack application** built with **Next.js** for the frontend and **Node.js + Express** for the backend.

---

## 📂 Project Structure

```
assignment/
  frontend/        # Next.js frontend
  backend/         # Express backend
    controllers/   # Business logic for routes
    models/        # Mongoose models (User, Task, etc.)
    routes/        # API routes (auth, task, profile)
    middleware/    # Middleware (auth handling)
    server.js      # Express app entrypoint
docs/
  postman_collection.json  # API documentation (Postman collection)
scaling.md                 # Notes on scaling for production
README.md                  # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React framework)
- **Backend:** Node.js with Express
- **Database:** MongoDB (via Mongoose models)
- **Auth:** JWT‑based authentication (middleware present)
- **API Testing:** Postman (collection provided in `docs/postman_collection.json`)

---

## 🚀 How to Run (Local)

### Backend
```bash
cd backend
npm install
npm run dev   # or: npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will typically run on `http://localhost:3000` and backend on `http://localhost:5000` (check your `.env`).

---

## API Documentation

- A **Postman collection** is provided at: `docs/postman_collection.json`  
- Import it into Postman, set the `{{baseUrl}}` variable (e.g. `http://localhost:5000`), and test available endpoints.

---

## Scaling Notes

Refer to `scaling.md` for detailed notes on how this project can be scaled into production:  
- CDN for frontend assets  
- Containerization & Kubernetes for backend  
- API Gateway & Load Balancer setup  
- Caching, monitoring, CI/CD, security best practices  

---

## Deliverables

- `README.md` — Project overview (this file)  
- `docs/postman_collection.json` — API docs for backend endpoints  
- `scaling.md` — Notes for production‑level scaling  

---
