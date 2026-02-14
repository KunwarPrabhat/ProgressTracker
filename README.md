# ProgressTracker
# QuestionTracker

A production-ready full-stack question tracking platform built with ASP.NET Core (.NET 8), PostgreSQL, and React.

This project demonstrates secure authentication, JWT authorization, email verification workflows, database migrations, idempotent seeding, CORS configuration, and real-world cloud deployment debugging.

---

# Overview

QuestionTracker is a full-stack web application designed to help users track coding problems, manage progress, and structure technical interview preparation.

This system reflects production engineering practices — not tutorial-level CRUD — including authentication design, deployment troubleshooting, and database lifecycle management.

---

# Core Features

* Email-based registration with OTP verification
* Secure password hashing (SHA256 for MVP, upgrade-ready for BCrypt)
* JWT-based authentication with claims
* Per-user data isolation
* Protected API endpoints
* Idempotent database seeding
* Automatic EF Core migrations on deployment
* Environment-variable-based configuration
* Cloud deployment (Render + Vercel)

---

# Tech Stack

## Backend

* ASP.NET Core Web API (.NET 8)
* Entity Framework Core
* PostgreSQL
* JWT Bearer Authentication
* Resend Email API (HTTP-based email delivery)
* Swagger / OpenAPI
* CORS Middleware

## Frontend

* React (Vite)
* JWT storage using localStorage
* Authenticated API requests (Bearer token)
* Environment-driven API configuration

## Infrastructure

* Render (Backend hosting + PostgreSQL)
* Vercel (Frontend hosting)
* GitHub (Version control & deployment trigger)

---

# Architecture

```
React Frontend (Vite)
        ↓
ASP.NET Core Web API
        ↓
Entity Framework Core
        ↓
PostgreSQL (Render Cloud)
```

Backend structure:

* Controllers → Request handling
* DbContext → ORM mapping
* Service layer → Email delivery logic
* JWT middleware → Authentication enforcement
* Seeder → Production-safe data provisioning

---

# Authentication System

## Registration Flow

1. User submits email + password
2. Password is hashed server-side
3. OTP generated and sent via Resend API
4. User verifies email
5. Account activated

## Login Flow

1. User submits email + password
2. Backend hashes password
3. Hash compared with stored value
4. JWT generated with claims:

   * NameIdentifier (UserId)
   * Email
5. Token returned to frontend

## JWT Configuration

Validation includes:

* Issuer validation
* Audience validation
* Lifetime validation
* Symmetric signing key verification

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

JWT is stored in localStorage and attached to authenticated API requests.

---

# CORS Configuration

Frontend and backend operate on different origins.

CORS policy explicitly allows the frontend origin.

Correct middleware order:

1. UseCors
2. UseAuthentication
3. UseAuthorization
4. MapControllers

This resolved preflight request failures and cross-origin blocking.

---

# Database Management

Database: PostgreSQL (Render)

Entity Framework Core manages:

* Schema creation
* Migrations
* Relationships
* Query abstraction

On application startup:

```
db.Database.Migrate();
```

Ensures automatic migration execution during deployment.

---

# Database Seeding

An idempotent seeder inserts initial SQL practice questions.

Seeder logic:

* Checks if Questions table contains data
* Seeds only if empty
* Prevents duplicates
* Safe across redeployments

This guarantees production-safe initialization.

---

# Email Verification System

## Initial Issue

SMTP-based email delivery failed in production because cloud providers block outbound SMTP ports.

## Solution

Migrated to HTTP-based email delivery using Resend API.

Advantages:

* Uses HTTPS (port 443)
* Cloud-compatible
* No SMTP configuration required
* Handles API-level error responses

EmailService:

* Reads RESEND_API_KEY from environment
* Uses HttpClient
* Sends OTP verification emails

---

# Environment Configuration

All secrets are managed via environment variables.

## Backend Variables

```
ConnectionStrings__DefaultConnection
Jwt__Key
Jwt__Issuer
Jwt__Audience
RESEND_API_KEY
```

No credentials are committed to source control.

## Frontend

```
VITE_API_URL=https://your-api-domain.onrender.com
```

API base:

```
const API_BASE = import.meta.env.VITE_API_URL + "/api";
```

---

# Frontend Integration

* login(email, password) sends credentials to API
* JWT stored in localStorage
* Authorization header automatically attached
* Questions fetched only if authenticated

Example header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Deployment Strategy

## Backend (Render)

* Connected to GitHub repository
* Auto-deploy enabled
* PostgreSQL provisioned
* Environment variables configured
* Automatic migrations applied on startup

## Frontend (Vercel)

* Connected to GitHub
* Production build deployed globally
* Environment variables configured
* Connected to deployed backend API

---

# Engineering Challenges Solved

## SMTP Blocked in Production

Replaced SMTP with HTTPS-based email API.

## CORS Preflight Failures

Fixed middleware order and origin policy configuration.

## JWT Validation Errors

Correctly configured issuer, audience, and signing key validation.

## Identity Reseeding

Learned PostgreSQL sequence behavior and used:

```
TRUNCATE TABLE ... RESTART IDENTITY CASCADE
```

## Migration Failures

Wrapped migration execution to surface deployment-time database issues.

## Environment Variable Scope Issues

Ensured secrets are accessed only during runtime.

---

# Security Practices

* Server-side password hashing
* JWT expiration enforced
* HTTPS-only deployment
* No secrets committed to GitHub
* API key rotation when exposed
* Claims-based identity for per-user data isolation

---

# Development Workflow

1. Local backend development
2. EF Core migrations
3. Swagger API testing
4. CORS debugging
5. Frontend integration
6. GitHub push
7. Render auto-deploy
8. Automatic migration + seeding
9. Production verification

---

# Future Improvements

* BCrypt password hashing
* Refresh tokens
* Role-based authorization
* Rate limiting
* Background job processing
* Admin dashboard
* CI/CD enhancements
* Integration tests
* Dockerized backend

---

# Running Locally

## Backend

```
dotnet restore
dotnet ef database update
dotnet run
```

Ensure environment variables are configured.

## Frontend

```
npm install
npm run dev
```

---

# Repository Structure

```
/QuestionTracker.Api
    /Controllers
    /Data
    /Models
    /Services
    Program.cs

/Frontend
    /components
    /pages
    api.js
```

---

# What This Project Demonstrates

* Full-stack system design
* Secure authentication implementation
* Production-safe migration strategy
* Cloud-native deployment troubleshooting
* Email verification architecture
* JWT-based API protection
* CORS debugging and middleware configuration
* Environment-driven configuration management
* Real-world backend problem solving

---

# Conclusion

QuestionTracker is a production-deployed full-stack application demonstrating backend architecture, authentication systems, cloud infrastructure management, and real-world debugging under deployment constraints.

This project reflects applied engineering principles and practical problem-solving rather than tutorial-level implementation.
