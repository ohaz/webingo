# Webingo

This is a simple Deno + React + MaterialUI Bingo implementation.

## Getting Started

### Prerequisites

To run this app, you will need to have [Deno](https://docs.deno.com/runtime/)
installed.

## Installation

### Install the dependencies

To install the dependencies for the frontend and backend, run the following
command:

```sh
deno install
```

### Run the dev server with vite

The app uses a Vite dev server to run in development mode. To start the dev
server, run the following command:

```sh
deno run dev
```

### Build the app

To build the app for production, run the following command:

```sh
deno run build
```

### Run the backend server

The backend server is not really used except for serving the frontend

## Usage

To edit the texts available, you currently have to modify `client/src/tests.ts`.

## Project Structure

```sh
. 
├── client 
│   ├── dist 
│   ├── public 
│   └── src 
│       ├── App.tsx 
│       └── main.tsx 
└── server 
    ├── main.ts 
    ├── main_test.ts 
    └── util 
        └── routeStaticFilesFrom.ts
```

- `App.tsx`: The main React component
- `main.tsx`: The entry point for the React app
- `main.ts`: The entry point for the Deno server
- `main_test.ts`: The test file for the Deno server
- `routeStaticFilesFrom.ts`: A utility function to serve static files
- `dist`: The output directory for the built React app
- `public`: The public directory for the React app
