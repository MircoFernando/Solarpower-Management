# SolarPower Management
### Solar Energy Monitoring System

SolarPower Management is a robust full-stack web application designed to monitor and manage solar energy units. It allows users to track solar unit performance in real-time, view energy generation statistics, and handle billing via invoices seamlessly.

---

## Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Planned Features](#planned-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [License](#license)

---

## Overview
This application serves as a comprehensive dashboard for both solar providers and consumers. It features:
- A **React Frontend** for data visualization, user dashboards, and payment processing.
- **Multiple Node.js/Express Microservices** that handle specific domains (Solar Unit data, User data, Invoices).
- **Clerk Authentication** for robust, secure, and easy-to-manage user identities.
- **Stripe Integration** for handling secure invoice payments.

---

## System Architecture & Implementation
This project uses a **Microservice-oriented architecture** to separate concerns and ensure scalability.

1.  **Frontend (Client):**
    - Built with **React & Vite**.
    - Uses **Redux Toolkit (RTK Query)** for efficient state management and API caching.
    - Protected routes are handled via **Clerk Middleware**.

2.  **Authentication:**
    - **Clerk** is used for the entire auth flow (Sign Up, Sign In, Session Management).
    - The frontend retrieves a token/session from Clerk, which is verified by the backend services to ensure request security.

3.  **Backend Services:**
    - The backend is split into dedicated services (e.g., Unit API, User API).
    - **Inter-Service Communication:** Services communicate with each other securely using **Shared Secrets** (API Keys) and header-based verification to prevent unauthorized external access.
    - **Database:** Uses **MongoDB** with Mongoose models to store structured data (Users, Units, Invoices).

4.  **Payments:**
    - Integrated with **Stripe** to handle credit card processing.
    - Webhooks are used to update invoice statuses automatically upon successful payment.

---

## Key Features
- **User Management:** Secure registration and login via Clerk (supports Social Logins).
- **Dashboard:** Interactive charts and tables showing energy output (kWh).
- **Solar Unit CRUD:** Add, update, and monitor the status of solar panels.
- **Billing System:** Generate invoices and process payments securely via Stripe.
- **Role-Based Access Control (RBAC):** Distinct interfaces for Admins (System oversight) and Users (Personal unit monitoring).
- **Email Notifications:** Send Email notifications after successful solar unit registration using EmailJS.

---

## Planned Features (Roadmap)
- **Anomaly Detection (ML):** Integrate a Machine Learning model to analyze energy output and automatically flag system faults or efficiency drops.
- **Predictive Analytics:** Forecast future energy generation based on weather data.


---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS, Lucide React |
| **State Management** | Redux Toolkit, RTK Query |
| **Authentication** | **Clerk** (Identity Management) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Payments** | Stripe API |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Version Control** | Git, GitHub |

---

### Deployed Links

- Frontend - https://solarpower-management.vercel.app
- Backend - https://solarpower-management.onrender.com
- API Service - https://solarpower-management-solarunit-api.onrender.com

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Connection String
- Clerk Publishable Keys & Secret Keys
- Stripe API Keys

### 1. Clone the repository
```bash
git clone [https://github.com/MircoFernando/Solarpower-Management.git](https://github.com/MircoFernando/Solarpower-Management.git)
cd Solarpower-Management



