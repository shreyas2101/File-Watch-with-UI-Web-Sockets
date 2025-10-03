# Real-time Log Tailing

This project is a simple web application that displays the content of a log file in real-time. It uses a Node.js server with WebSockets to monitor a log file for changes and pushes new log entries to the web client.

## Features

- Real-time log updates using WebSockets.
- Displays the last 10 lines of the log file on initial load.
- Scalable and performant for large files.
- Node.js backend server.
- Simple HTML/JavaScript frontend.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory:
    ```bash
    cd <>
    ```
3.  Install the dependencies using npm:
    ```bash
    npm install
    ```

## Usage

1.  **Start the server:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

2.  **Generate logs:**

    To see the real-time updates in action, you can use the provided script to generate sample log entries. Open a new terminal window and run:

    ```bash
    ./generate_logs.sh
    ```

    This will append timestamps to the `sample.log` file every second.

3.  **View the logs:**

    Open your web browser and navigate to `http://localhost:3000`. You will see the log messages as they are generated.

## How it works

- The **Node.js server** (`server.js`) serves the main HTML page (`index.html`).
- It sets up a **WebSocket server** to communicate with the client.
- When a client connects, the server reads the last 10 lines of `sample.log` and sends them to the client.
- The server then **watches `sample.log` for changes**. When the file is updated, the new lines are sent to the client through the WebSocket connection.
- The **frontend** (`index.html`) establishes a WebSocket connection to the server and displays the received log messages in the browser.
