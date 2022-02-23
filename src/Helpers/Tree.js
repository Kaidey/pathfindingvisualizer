class Tree {
	constructor(cell) {
		this.parent = null;
		this.cell = cell;
	}

	get root() {
		return this.parent ? this.parent.root : this;
	}

	connected(tree) {
		return this.root === tree.root;
	}

	connect(tree) {
		tree.root.parent = this;
	}
}

export default Tree;
