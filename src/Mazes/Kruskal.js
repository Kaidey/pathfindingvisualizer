import Tree from "../Helpers/Tree.js";

class KruskalRandomized {
	constructor(grid, tableElement) {
		this.grid = grid;
		this.tableElement = tableElement;
	}

	shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};

	run() {
		return new Promise((resolve, reject) => {
			const edges = [];
			const sets = [];
			this.grid.forEach((row) => {
				row.forEach((cell) => {
					if (
						!(cell.row % 2 === 0 && cell.col % 2 === 0) &&
						!(cell.row % 2 !== 0 && cell.col % 2 !== 0)
					) {
						edges.push(cell);
					} else if (cell.row % 2 !== 0 && cell.col % 2 !== 0) {
						//filler cells
						let element = this.tableElement.querySelector(
							`#node_${cell.row}_${cell.col}`
						);
						element.className = "wall";
						this.grid[cell.row][cell.col].isWall = true;
					} else {
						sets.push(new Tree(cell));
					}
				});
			});

			this.shuffle(edges);

			while (edges.length !== 0) {
				const edge = edges.pop();

				let firstCell = null;
				let secondCell = null;

				if (edge.col % 2 === 0) {
					sets.forEach((set) => {
						if (set.cell.col === edge.col && set.cell.row === edge.row + 1) {
							firstCell = set;
						}
						if (set.cell.col === edge.col && set.cell.row === edge.row - 1) {
							secondCell = set;
						}
					});
				} else {
					sets.forEach((set) => {
						if (set.cell.row === edge.row && set.cell.col === edge.col - 1) {
							firstCell = set;
						}
						if (set.cell.row === edge.row && set.cell.col === edge.col + 1) {
							secondCell = set;
						}
					});
				}

				if (firstCell !== null && secondCell !== null) {
					if (!firstCell.connected(secondCell)) {
						firstCell.connect(secondCell);
					} else {
						let element = this.tableElement.querySelector(
							`#node_${edge.row}_${edge.col}`
						);
						element.className = "wall";
						this.grid[edge.row][edge.col].isWall = true;
					}
				}
			}

			resolve(this.grid);
		});
	}
}

export default KruskalRandomized;
