class GridHandlers {
	getInitialGrid() {
		return new Promise((resolve, reject) => {
			const grid = [];
			for (let row = 0; row < 17; row++) {
				const currentRow = [];
				for (let col = 0; col < 70; col++) {
					currentRow.push({
						row: row,
						col: col,
						distance: Infinity,
						cost: Infinity,
						path: null,
						isWall: false,
					});
				}
				grid.push(currentRow);
			}

			resolve(grid);
		});
	}

	clearGridPath(grid) {
		return new Promise((resolve, reject) => {
			for (let row = 0; row < 17; row++) {
				for (let col = 0; col < 70; col++) {
					const node = {
						row: row,
						col: col,
						distance: Infinity,
						cost: Infinity,
						path: null,
						isWall: false,
					};

					if (grid[row][col].isWall) {
						node.isWall = true;
					}
					grid[row][col] = node;
				}
			}
			resolve();
		});
	}
}

export default GridHandlers;
