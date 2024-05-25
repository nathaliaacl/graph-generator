# Graph Manipulation App

This is a web application for manipulating graphs, built with React, Flask, and NetworkX.

## Features

- **Add Vertex**: Add a vertex to the graph.
- **Add Edge**: Add an edge between two vertices in the graph.
- **Set Graph Type**: Set the type of the graph (directed or undirected).
- **Clear Graph**: Remove all vertices and edges from the graph.
- **Remove Last Vertex**: Remove the last added vertex from the graph.
- **Graph Metrics**: Get the number of vertices and edges in the graph.
- **Get Adjacency List**: Get the adjacency list of a vertex in the graph.
- **Get Vertex Degree**: Get the degree of a vertex in the graph.
- **Check Adjacency**: Check if two vertices are adjacent in the graph.
- **Shortest Path**: Find the shortest path between two vertices in the graph.
- **Add Batch**: Add vertices and edges in batch to the graph.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Flask
- Graph Library: NetworkX

## Setup

1. Clone the repository.
2. Install dependencies for the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   pip install -r requirements.txt
   ```
3. Start the frontend and backend servers:
   ```bash
   # In the frontend directory
   npm start

   # In the backend directory
   flask run
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Feel free to customize this README to better fit your project!
