---

# Realisation of a web application for the functionality of the Dijkstra algorithm under consideration of didactic aspects

## Introduction

This is a project as part of my bachelor thesis at the university, in which a web application was developed to demonstrate the Dijkstra algorithm. The focus is on the didactic, playful presentation in order to make the functionality of the algorithm understandable.

## Contents

- Introduction](#introduction)
- [Project overview](#project overview)
- Technologies](#technologies)
- Installation](#installation)
- Usage](#usage)
- Code structure](#code-structure)
- Contributors](#contributors)
- licence](#licence)

## Project overview

The Dijkstra algorithm is a well-known algorithm for determining the shortest paths in a graph. This web application makes it possible to experience the algorithm interactively and to understand how it works step by step.

### Main features

- Visualisation of the algorithm**: Through different game modes and graphs. Step by step.
- **Interactive input**: Users can create their own graphs or use randomly generated graphs.
- **Priority Queue Demonstration**: Demonstrates the use and functionality of a priority queue within the algorithm.
- **Help options**: Solution of the next, correct input possible.

## Technologies

- HTML5**: Structure of the web application.
- CSS3**: Styling and layout of the user interface.
- JavaScript**: Logic of the Dijkstra algorithm and interactivity of the web application.

## Installation

1. **Cloning the repository**:
    ```bash
    git clone https://github.com/deinBenutzername/dijkstra-webapp.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd dijkstra-webapp
    ```
3. **Open the `index.html` file in a web browser**.

## Usage

1. open the web application in a web browser.
2. select either a predefined graph, create a random graph or design your own graph.
3. start the Dijkstra algorithm by using the corresponding buttons.
4. observe the step-by-step calculation and visualisation of the shortest paths.

## Code structure

dijkstra-webapp/
│
├── index.html # Main file of the web application
├── style.css # Stylesheet for designing the user interface
├── script.js # JavaScript file with the implementation of the Dijkstra algorithm
├── assets/ # Directory for images and other static resources
│ └── hshl-logo.png # Example image, can be replaced by other images
└── README.md # This README file

### Important sections of the code

- HTML (index.html)**: Structure of the user interface and integration of CSS and JavaScript.
- CSS (style.css)**: Styling of the various elements of the user interface.
- JavaScript (script.js)**: Implementation of the Dijkstra algorithm and interactive functions.

## Contributors

- **Ramo** - Initial developer and author of the bachelor thesis

## Licence

This project is licensed under the MIT licence. See the [LICENSE](LICENSE) file for more details.

---
