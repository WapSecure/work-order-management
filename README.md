# Work Order Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A production-ready work order management system built with Next.js 16.2.10, TypeScript, and
> Tailwind CSS.

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)
- [Architecture](#-architecture)
- [Caching Strategy](#-caching-strategy)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Validation & Security](#-validation--security)
- [Accessibility](#-accessibility)
- [Performance](#-performance)
- [API Endpoints](#-api-endpoints)
- [UI/UX](#-uiux)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

This application provides a complete solution for managing work orders with:

- **CRUD Operations** - Create, read, update, and delete work orders
- **Search & Filter** - Find work orders by title (min 3 chars) or filter by status
- **Priority Management** - Low, Medium, High priorities with color coding
- **Status Tracking** - Open, In Progress, Done with color coding
- **Clean Architecture** - Server/Client component separation
- **Comprehensive Testing** - Unit, component, integration, and E2E tests
- **File-based Storage** - JSON persistence with intelligent caching

## ✨ Key Features

- ✅ List work orders with priority and status indicators
- ✅ Create new work orders with validation
- ✅ Edit and delete existing work orders
- ✅ View detailed work order information
- ✅ Filter by status (Open/In Progress/Done)
- ✅ Auto-search by title (min 3 characters with debounce)
- ✅ Keyboard-accessible and responsive UI
- ✅ Real-time validation feedback
- ✅ Optimistic updates with TanStack Query
- ✅ Custom delete confirmation modal
- ✅ Dark mode support

## 🎥 Videos

### Demo Video

Watch a 5-minute walkthrough of all features:
[📹 Demo Video](https://www.veed.io/view/aff944e7-e9af-4512-8854-a3c95b007b1e?source=editor&panel=share)

### Self-Presentation

1-minute introduction about myself and my experience:
[📹 Self-Presentation](https://www.veed.io/view/71f9c982-2811-49df-8e56-455bfcd9b11a?panel=download)

## 📧 Submission Details

**GitHub Repository:** https://github.com/WapSecure/work-order-management

**Submitted By:** Joseph Orji **Email:** writewapsecure@gmail.com

## ✅ Assessment Checklist

### Core Features

- ✅ List Work Orders with table
- ✅ Create Work Order with form
- ✅ Edit/Delete work orders
- ✅ Detail View page
- ✅ Search/Filter functionality

### Technical Requirements

- ✅ Next.js App Router
- ✅ Server Components
- ✅ Client Components (where needed)
- ✅ Route Handlers (CRUD)
- ✅ File-based JSON persistence
- ✅ Seed script
- ✅ Server-side validation (Zod)
- ✅ TypeScript types

### Testing

- ✅ Unit tests
- ✅ Component tests
- ✅ Integration tests
- ✅ E2E tests

### Documentation

- ✅ README with setup/run/seed/testing
- ✅ Cache choice explanation
- ✅ Performance notes
- ✅ Accessibility documentation
- ✅ Demo video
- ✅ Self-presentation video

### Additional Features

- ✅ i18n scaffolding (English/Spanish)
- ✅ Accessibility (ARIA, keyboard navigation)
- ✅ Performance optimizations
- ✅ Custom delete modal
- ✅ Real-time search/filter
- ✅ Optimistic updates

## 🏗️ Tech Stack

| Technology      | Description                     |
| --------------- | ------------------------------- |
| Next.js 16.2.10 | React framework with App Router |
| TypeScript      | Type-safe JavaScript            |
| Tailwind CSS 4  | Utility-first CSS framework     |
| TanStack Query  | Data fetching and caching       |
| Zod             | Schema validation               |
| Vitest          | Unit and component testing      |
| Playwright      | E2E testing                     |
| Radix UI        | Accessible component primitives |

## 📋 Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Git

## 🔧 Installation

```bash
# Clone repository
git clone https://github.com/WapSecure/work-order-management.git
cd work-order-management

# Install dependencies
pnpm install

# Seed sample data
pnpm seed

# Start development server
pnpm dev
```
