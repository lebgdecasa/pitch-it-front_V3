# Pitch-It: AI-Powered Pitch Deck Builder

## Project Overview

**Pitch-It** is an AI-powered application designed to help users build compelling pitch decks for their startup ideas. It guides users through various stages of project development, from ideation to investor readiness.

**Keywords:** pitch, startup, AI, validation

## Features

Based on the codebase, Pitch-It appears to support the following features:

*   **Project Management:**
    *   Create, manage, and track multiple projects.
    *   Dashboard view to see all projects.
    *   Projects progress through distinct stages: Ideation, Validation, Development, Refinement, Deck Creation, Testing, Pitch Deck, and Investor Ready.
*   **Pitch Creation:**
    *   Structured input for core pitch elements: Problem, Solution, Target Market, Business Model, Competition, Unique Selling Point, and Marketing Strategy.
    *   Option for a full description for a pitch assistant workflow.
*   **Pitch Deck Building:**
    *   Functionality to create various slides for a pitch deck, including Cover, Problem, Solution, Market, Product, Traction, Team, Competition, Business Model, Financials, Ask, and Contact.
*   **Feedback System:**
    *   Ability to receive and store feedback, potentially from VCs or mentors, including overall scores, strengths, improvement points, and notes.
*   **User Authentication:**
    *   Users need to log in to access their dashboard and projects.
*   **Group Chat (Potential):**
    *   Type definitions suggest a group chat feature with different personas (founder, investor, mentor, customer, user).
*   **Analytics (Potential):**
    *   Type definitions suggest tracking of project metrics like total projects, completed projects, average feedback score, and projects by stage.

## Codebase Structure

The project is a Next.js application, likely using the App Router. Here's a general overview of the directory structure:

*   **`/` (Root Directory):**
    *   `package.json`: Defines project metadata, dependencies, and scripts.
    *   `next.config.js`: Configuration file for Next.js.
    *   `.gitignore`: Specifies files and directories to be ignored by Git.
    *   `README.md`: (This file) Provides information about the project.
    *   `tsconfig.json`: TypeScript configuration.
    *   `postcss.config.js`, `tailwind.config.js`: Configuration for PostCSS and Tailwind CSS.
*   **`src/`:** Contains the core source code of the application.
    *   `app/`: This is where the Next.js App Router pages and layouts are defined.
        *   `page.tsx`: The main landing page of the application.
        *   `dashboard/page.tsx`: The user's project dashboard page.
        *   Other directories would represent different routes (e.g., `/project/[id]`, `/projects/new`).
    *   `components/`: Likely houses reusable React components used throughout the application.
        *   `ui/`: Specific UI elements like buttons, dialogs, etc. (inferred from imports).
        *   `client-components/`: Components intended to run on the client-side.
    *   `providers/`: Contains React Context providers for managing global state (e.g., `AppContext` for user and project data).
    *   `types/`: Holds TypeScript type definitions and interfaces used across the project (e.g., `User`, `Project`, `Pitch`, `ProjectStage`). There are `index.ts` and `types.ts` which might indicate ongoing refactoring or organization of types.
    *   `lib/`: (Assumed) Utility functions and helper modules.
    *   `styles/`: (Assumed, if not using global CSS in `app/layout.tsx`) Global styles or style-related configurations.
*   **`public/`:** For static assets like images, fonts, etc., that are served directly by the web server.

This structure follows common Next.js conventions and promotes a modular and organized codebase.
