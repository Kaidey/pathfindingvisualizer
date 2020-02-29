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
          queue.push(cell);
        }
      });
    });

    return queue;
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
    let startIdx = this.queue.indexOf(this.startNode);
    let current = this.queue[startIdx];
    current.cost = 0;

    //Sort queue by cost in descending order so the last element is always the next to be visited and thus can be removed (pop()) from the queue easily
    this.queue.sort((a, b) => {
      return b.cost - a.cost;
    });

    //While endNode hasn't been visited (Dijkstra adaptation to a 2D grid)
    while (visited.indexOf(this.endNode) === -1) {
      let currentNeighbours = this.getNeighbours(current);

      currentNeighbours.forEach(neigh => {
        if (neigh) {
          let aux = current.cost + 1;
          if (neigh.cost > aux) {
            neigh.cost = aux;
            neigh.path = current;
          }
        }
      });

      visited.push(current);
      this.queue.pop();
      this.queue.sort((a, b) => {
        return b.cost - a.cost;
      });

      current = this.queue[this.queue.length - 1];
    }

    let endN = visited.find(aux => {
      return aux.row === this.endNode.row && aux.col === this.endNode.col;
    });

    return { sp: this.computeSP(endN), visited: visited };
  }
}
