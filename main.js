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

  class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

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

    levelOrder(root, cb) {
        if (!root) return [];
        
        let result = [];
        let queue = new Queue();

        queue.enqueue(root);

        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
    
            if (cb) {
                cb(currentNode.data);
            } else {
                result.push(currentNode.data);
            }
    
            if (currentNode.left) {
                queue.enqueue(currentNode.left);
            }
    
            if (currentNode.right) {
                queue.enqueue(currentNode.right);
            }
        }
    
        return result;
    }

    inOrder(root, cb) {
        let result = [];

        function recursiveInOrder(root) {
            if (root !== null) {
                recursiveInOrder(root.left);
                if (cb) cb(root.data);
                result.push(root.data);
                recursiveInOrder(root.right);
            }
        }
    
        recursiveInOrder(root);
    
        return result;
    }

    preOrder(root, cb) {
        if (!root) return null;

        if (cb) cb(root.data);

        this.inOrder(root.left, cb);

        this.inOrder(root.right, cb);
    }

    postOrder(root, cb) {
        if (!root) return null;

        this.inOrder(root.left, cb);
        
        this.inOrder(root.right, cb);
        
        if (cb) cb(root.data);
    }

    height(root) {
        if (!root) return -1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(root) {

        if (!root) return 0;

        let leftDepth = 0;
        let rightDepth = 0;


        while (root.left) {
            root = root.left;
            leftDepth++;
        }

        while (root.right) {
            root = root.right;
            rightDepth++;
        }

        return Math.max(leftDepth, rightDepth) + 1;
    }

    isBalanced(root) {
        if (!root) return true;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(root.left) &&
            this.isBalanced(root.right)
        ) {
            return true;
        }
    
        return false;
    }

    rebalance(root) {
        let arr = this.inOrder(root);
        let tree = this.buildTree(arr);

        return tree;
    }
  }


  function print(value) {
    console.log(value);
  }

  function printOrders(tree, node) {
    console.log('In Level:');
    tree.levelOrder(node, print)
    console.log('Pre Order:');
    tree.preOrder(node, print)
    console.log('Post Order:');
    tree.postOrder(node, print)
    console.log('In Order:');
    tree.inOrder(node, print);
  }


  function randomArray () {
    const arrayLength = Math.floor(Math.random() * 31) + 10;
    const array = [];

    for (let i = 0; i < arrayLength; i++) {
        const num = Math.floor(Math.random() * 100) + 1;
        array.push(num);
    }
    return array;
}

  function driver () {
    let tree = new Tree();
    let arr = randomArray();
    let node = tree.buildTree(arr);
    const num = Math.floor(Math.random() * 6) + 1;


    console.log('1 Balanced:', tree.isBalanced(node));
    
    
    for (let i = 0; i < num; i++) {
        const num = Math.floor(Math.random() * 100) + 1;
        tree.insert(node, num);  
    }
    let balanced = tree.isBalanced(node);
    console.log('2 Balanced:', tree.isBalanced(node));

    if (!balanced) {
        let newTree = tree.rebalance(node)
        console.log('Balanced:', tree.isBalanced(newTree));
    };

    printOrders(tree, node);
  }



driver();