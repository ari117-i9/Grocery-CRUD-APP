# Grocery Store Inventory CRUD App

A full-stack CRUD (Create, Read, Update, Delete) application for managing grocery store inventory. The project is split into a **Node.js/Express/MongoDB** backend REST API and a **React (Vite + Tailwind CSS)** single-page frontend.

## Overview

The app lets a user view a grid of products in inventory, add a new product, update an existing product's details, and delete a product — with toast notifications (`react-toastify`) for success/error feedback and a confirmation dialog (`SweetAlert2`) before deleting.

- **Backend**: Exposes a REST API (`/api/inventory`) backed by MongoDB via Mongoose, with centralized error handling and CORS restricted to the configured frontend origin.
- **Frontend**: A React SPA that consumes the API using Axios, routed with React Router, and styled with Tailwind CSS v4.


## Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| `react` / `react-dom` (v19) | UI library |
| `react-router-dom` (v7) | Client-side routing |
| `axios` | HTTP client for calling the backend API |
| `react-toastify` | Toast notifications |
| `sweetalert2` | Confirmation modal (used for delete confirmation) |
| `tailwindcss` (v4) + `@tailwindcss/vite` | Utility-first styling |
| `vite` | Dev server / build tool |
| `eslint` + plugins | Linting |

### Backend
| Package | Purpose |
|---|---|
| `express` (v5) | HTTP server / routing |
| `mongoose` / `mongodb` | MongoDB object modeling and driver |
| `cors` | Cross-origin resource sharing, restricted to a single frontend origin |
| `dotenv` | Loads environment variables from `.env` |
| `express-async-handler` | Wraps async route handlers to forward errors to Express error middleware |
| `nodemon` (dev) | Auto-restarts server on file changes |


## Project Structure

```
Grocery-CRUD-APP-main/
├── backend/
│   ├── controllers/
│   │   └── inventoryController.js   # Route handler logic (CRUD operations)
│   ├── middleware/
│   │   └── errorMiddleware.js       # Centralized Express error handler
│   ├── models/
│   │   └── productModel.js          # Mongoose schema/model for a Product
│   ├── routes/
│   │   └── inventoryRoute.js        # /api/inventory route definitions
│   ├── server.js                    # App entry point (DB connect + server start)
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    └── inventory-crud/
        ├── index.html
        ├── vite.config.js           # Vite config (React + Tailwind plugins)
        ├── eslint.config.js
        ├── package.json
        └── src/
            ├── main.jsx              # React root, wraps <App/> in <BrowserRouter>
            ├── App.jsx               # Top-level layout, nav bar, and route table
            ├── index.css             # Tailwind import + base styles
            ├── components/
            │   └── Product.jsx       # Product card (display + delete)
            └── pages/
                ├── Home.jsx          # Fetches & lists all inventory as a grid
                ├── Add.jsx           # Form to create a new product
                ├── Update.jsx        # Form to fetch & edit an existing product
                └── Edit.jsx          # Currently empty (unused) file
```

---

## Data Model

Defined in `backend/models/productModel.js` (Mongoose schema, collection: `products`):

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `name` | `String` | Yes | — | Custom validation message if missing |
| `quantity` | `Number` | Yes | `0` | |
| `price` | `Number` | Yes | `0.00` | |
| `image` | `String` | No | — | Expected to be an image URL |
| `createdAt` / `updatedAt` | `Date` | auto | auto | Added via `{ timestamps: true }` |

Mongoose also auto-generates the `_id` field used to identify products in the API and frontend routes.

---

## API Reference

Base path: **`/api/inventory`** (mounted in `server.js`)

| Method | Endpoint | Description | Handler |
|---|---|---|---|
| `GET` | `/api/inventory` | Get all products | `getInventory` |
| `GET` | `/api/inventory/:id` | Get a single product by ID | `getProduct` |
| `POST` | `/api/inventory` | Create a new product (expects `name`, `quantity`, `price`, `image` in body) | `addInventory` |
| `PUT` | `/api/inventory/:id` | Update a product by ID | `updateInventory` |
| `DELETE` | `/api/inventory/:id` | Delete a product by ID | `deleteInventory` |

**Error handling**: All controllers are wrapped in `express-async-handler`. On failure, they set a status code (defaulting to `500`, or `404` for "not found" cases in update/delete) and throw, which is caught by `errorMiddleware.js`. That middleware returns:
```json
{ "message": "<error message>", "stack": "<only included when NODE_ENV=development>" }
```

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended) and npm
- A MongoDB database (local instance or a cloud cluster, e.g. MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)), then run:

```bash
npm run dev     # starts with nodemon (auto-restart on changes)
# or
npm run serve   # starts once with node
```

The server connects to MongoDB first; once connected, it starts listening on `PORT`.

> Note: `server.js` explicitly overrides the system DNS resolvers to Google (`8.8.8.8`) and Cloudflare (`1.1.1.1`) via Node's `dns` module before connecting to MongoDB — useful in environments where default DNS resolution to a MongoDB Atlas SRV record is unreliable.

### Frontend Setup

```bash
cd frontend/inventory-crud
npm install
```

Create a `.env` file in `frontend/inventory-crud/` (see [Environment Variables](#environment-variables)), then run:

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # run ESLint
```

---

## Environment Variables

### `frontend/inventory-crud/.env`
| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API | `http://localhost:3000` |

### `backend/.env`
| Variable | Description | Example |
|---|---|---|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/inventory` |
| `PORT` | Port the Express server listens on | `5000` |
| `FRONTEND` | Allowed CORS origin (your frontend's URL) | `http://localhost:5173` |

Both `.env` files are already excluded via `.gitignore`.

---

## Available Scripts

### Backend (`backend/package.json`)
- `npm run serve` – runs `node server.js`
- `npm run dev` – runs `nodemon server.js`
- `npm test` – placeholder, not implemented

### Frontend (`frontend/inventory-crud/package.json`)
- `npm run dev` – Vite dev server with HMR
- `npm run build` – production build
- `npm run preview` – preview built app locally
- `npm run lint` – ESLint over the project


- Add pagination or search/filtering on the Home page for larger inventories.
- Add authentication and authorization for inventory management routes.
- Add automated tests (currently `npm test` in the backend is a placeholder).
