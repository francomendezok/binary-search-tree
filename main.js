const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


  class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
  }

  class Tree {
    constructor () {
        this.root = null;
    }

    buildTree(array) {
        const sortedUniqueArray = Array.from(new Set(array)).sort((a, b) => a - b);

        this.root = this.buildTreeRecursive(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

        return this.root;
    }

    buildTreeRecursive(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTreeRecursive(array, start, mid - 1);
        node.right = this.buildTreeRecursive(array, mid + 1, end);

        return node;
    }

    insert(root, value) {
        if (!root) return new Node(value);

        if (value > root.data) root.right = this.insert(root.right, value)
        
        else if (value < root.data) root.left = this.insert(root.left, value);
        
        return root;
    }

    delete(root, value) {

        if (!root) return null;

        // First Case: Leaf Node // 
        if (root.data === value && !root.left && !root.right) {
            root = null;
            return root;
        };
        
        // Second Case: Node with 1 child // 
        if (root.data === value && !root.left) {
            let temp = root.right;
            root = null;
            return temp;
        } else if (root.data === value && !root.right) {
            let temp = root.left;
            root = null;
            return temp;
    }
        
        // Third Case: Node with 2 children // 
        if (root.data === value && root.right && root.left) {
            
            root.data = this.findMinValue(root.right);
            // Delete the in-order successor
            
            root.right = this.delete(root.right, root.data);
        }


        if (value > root.data) root.right = this.delete(root.right, value)
        
        else if (value < root.data) root.left = this.delete(root.left, value);
        
        return root;
    }

    findMinValue(root) {
        while (root.left) {
            root = root.left;
        }
        return root.data;
    }

    find(root, value) {
        if (!root) return 'No node';

        if (root.data === value) return root;

        if (value > root.data) return this.find(root.right, value)
        
        else if (value < root.data) return this.find(root.left, value);
    }
  }
  let tree = new Tree();
  let node = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  tree.insert(node, 300);
  tree.delete(node, 67);
  let is = tree.find(node, 4)
  console.log(is);
