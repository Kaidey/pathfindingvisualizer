export default class Dijkstra {
  constructor(grid, startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.queue = this.initqueue(grid);
  }

  getNeighbours(node) {
    const neighbours = [
      this.queue.find(neigh => {
        return neigh.row === node.row + 1 && neigh.col === node.col;
      }),
      this.queue.find(neigh => {
        return neigh.row === node.row - 1 && neigh.col === node.col;
      }),
      this.queue.find(neigh => {
        return neigh.col === node.col + 1 && neigh.row === node.row;
      }),
      this.queue.find(neigh => {
        return neigh.col === node.col - 1 && neigh.row === node.row;
      })
    ];

    return neighbours;
  }

  initqueue(grid) {
    const queue = [];

    grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isWall) {
          cell.distance = Infinity;
          queue.push(cell);
        }
      });
    });

    return queue;
  }

  calcEuclideanDistance(node) {
    const xCoords = Math.pow(this.endNode.col - node.col, 2);
    const yCoords = Math.pow(this.endNode.row - node.row, 2);

    return Math.sqrt(xCoords + yCoords);
  }

  //Follow the path property of each visited node starting at the end node to build the full shortest path from start to end (reverse at the end)
  computeSP(end) {
    let sp = [];
    let current = end;

    sp.push(end);

    while (current.path) {
      sp.push(current.path);
      current = current.path;
    }

    return sp.reverse();
  }

  run() {
    let visited = [];
    let endNode = this.queue.find(n => {
      return n.col === this.endNode.col && n.row === this.endNode.row;
    });
    let current = this.queue.find(n => {
      return n.col === this.startNode.col && n.row === this.startNode.row;
    });
    current.cost = 0;

    //Sort so start node is the last node on the list and can be popped
    this.queue.sort((a, b) => {
      return b.cost - a.cost;
    });

    //While endNode hasn't been visited (Dijkstra adaptation to a 2D grid)
    while (visited.indexOf(endNode) === -1) {
      let currentNeighbours = this.getNeighbours(current);

      currentNeighbours.forEach(neigh => {
        if (neigh) {
          let aux = current.cost + 1;
          if (neigh.cost > aux) {
            neigh.cost = aux;
            neigh.path = current;
            neigh.distance = this.calcEuclideanDistance(neigh) + neigh.cost;
          }
        }
      });

      visited.push(current);
      this.queue.pop();
      //Sort queue by distance in descending order so the last element is always the next to be visited and thus can be removed (pop()) from the queue easily
      this.queue.sort((a, b) => {
        return b.distance - a.distance;
      });

      current = this.queue[this.queue.length - 1];
    }

    let endN = visited.find(aux => {
      return aux.row === this.endNode.row && aux.col === this.endNode.col;
    });

    return { sp: this.computeSP(endN), visited: visited };
  }
}
