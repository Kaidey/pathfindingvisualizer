# v2.0.0

### Added

- Implemented A\* algorithm
- Message containing elapsed time, nodes visited and path length after algorithm completion
- Implemented function to clear the path discovered on an execution and keep the start, end and wall nodes (the user can then run the same or another algorithm with the same grid layout)

### Updated

- Grid styling
- Menu styling
- Algorithm execution animations
- Code refactored: all components turned into component classes; each .jsx file contains logic for a single component (which wasn't the case in the Menu.jsx component); removed AlgosDropdown and NodesDropdown and instead implemented a generic Dropdown component

### Fixed

- Algorithms no longer explore the inner nodes of a walled area if that area contains the end node and thus it is unreachable (no path from start to end)
- A wall is no longer placed on mouseOver even if the mouse button is no longer being held down
- Trying to run an algorithm on the same configuration of nodes if a solution is on the screen no longer overrides it. Instead clears the existing path before
  starting execution
- The user can no longer clear the board or path while the animation of a solution is running
- The user can no longer place nodes while the animation of a solution is running

# v1.0.0

### Added

- Initial grid is now displayed
- There is a button for each available node
- There is visual feedback when a grid cell is clicked (the feedback is different for each node selected)
- Limitation to the number of start and end nodes (there can only be 1 of each)
- A node can't be placed over an existing node (className != unvisited)
- It is possible to add walls by clicking a cell and then dragging the mouse over the grid
- Implemented dijkstra's algorithm visualization
- Implemented button to clear the board
- Implemented algorithm selections
