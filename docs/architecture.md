# Architecture

## Server Components

- Pages use Server Components for data fetching
- Client Components only used for interactivity (forms, filters)
- Clean separation with `'use client'` directives
- Improved performance and SEO

## Data Layer

- File-based JSON persistence
- Repository pattern with caching (5s TTL)
- Singleton pattern for repository instance
- CRUD operations with optimistic updates

## API Layer

- RESTful Route Handlers
- Zod validation for all inputs
- Consistent error responses
- Field-level error messages
- Type-safe request/response handling

## Component Architecture

## Technology Decisions

### Why Next.js 16.2.10?

- Server Components for better performance
- App Router for improved routing
- Turbopack for faster development
- React 19 support

### Why File-based JSON?

- Simple setup for demo
- No external dependencies
- Easy to seed and reset
- Good for prototyping

### Why TanStack Query?

- Optimistic updates
- Built-in caching
- Automatic refetching
- Dev tools for debugging
