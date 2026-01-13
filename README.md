# AI Infrastructure Market Map

A high-performance, interactive visualization of the AI infrastructure ecosystem, built with D3.js. This project maps the complex relationships between semiconductor manufacturers, cloud providers, and networking companies in a force-directed graph.

## Features

-   **Interactive Force-Directed Graph**: Physics-based visualization where nodes represent companies and links represent supply chain relationships.
-   **Sector Color Coding**: Nodes are color-coded by industry sector (e.g., Manufacturing, Compute, Cloud) for instant visual recognition.
-   **Dynamic Sizing**: Bubble sizes reflect connectivity and importance within the ecosystem.
-   **Performance Optimized**: 
    -   Custom D3 selection caching for 60fps rendering.
    -   Optimized physics simulation settings for fast stabilization.
    -   Smart rendering that only applies expensive effects (like glows) on interaction.
-   **Detailed Information**: Hover over any company to see stock ticker, exchange, and sector details.

## Tech Stack

-   **Frontend**: Vanilla JavaScript (ES6+)
-   **Visualization**: D3.js (v7)
-   **Styling**: CSS3 (Glassmorphism design)

## Setup

1.  Clone the repository.
2.  Open `index.html` in any modern web browser.
    -   No build step required.
    -   No local server required (runs directly from file system).

## Project Structure

-   `index.html`: Main entry point and layout.
-   `app.js`: Core logic, D3 force simulation, and event handlers.
-   `data.js`: Structured dataset of companies and hierarchical relationships.
-   `styles.css`: Visual styling, animations, and dark mode theme.
-   `stock-api.js`: (Optional) Mock integration for stock data.

## Usage

-   **Drag**: Click and drag bubbles to rearrange the map.
-   **Hover**: Hover over a node to see direct connections and detailed info.
-   **Scroll**: Zoom in and out of the map.
