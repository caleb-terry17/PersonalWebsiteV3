///////////////////
// imports
///////////////////

// afekj;rajkg;lejk;akjfgja;ljaf;lejka;lk

///////////////////
// globals
///////////////////
// document tags to display compare values
let hc = document.getElementById("hcOut");

///////////////////
// classes
///////////////////
// NOTE: the leafs will all be "Char" obj's while rest of the nodes in the tree will be "Node's"

// node object for the binary tree which keeps track of a letters frequency
class Node {
    constructor(l, r) {
        // left and right child of the current node
        // NOTE: r.freq >= l.freq
        this.left = l;  // 0
        this.right = r;  // 1
        // frequency of left and right childs
        this.freq = l.freq + r.freq;
    }
}

// holds a character and it's frequency
class Char {
    constructor(c, f) {
        // character represented 
        this.char = c;
        // chars frequency 
        this.freq = f;
    }
}

///////////////////
// helper functions
///////////////////
// inserts an element of an array in sorted order
function pushSort(ary, elem) {
    ary.push(elem);  // element is now last element in ary
    let idx = ary.length - 1;
    let temp;
    while (idx > 0 && ary[idx].freq < ary[idx - 1].freq) {
        // swap
        temp = ary[idx];
        ary[idx] = ary[idx - 1];
        ary[idx - 1] = temp;
    }
    return ary;
}

///////////////////
// huffman code calculation
///////////////////
// takes a list of Char's and constructs a tree
function makeTree(list) {
    let l, r;  // left and right child to be popped from list
    // want final length of list to be 1 
    while (list.length > 1) {
        // l <= r
        l = list.shift();
        r = list.shift();
        // add new node
        pushSort(list, new Node(l, r));
    }
    return list[0];  // parent node of tree
}

// given a file, reads in and counts the frequencies of each character
function countFreq(input) {
    let freqList;
    // readFile(fileName, 'utf-8', (err, file) => {
        // if (err) { throw err; }  // check for error
        // file = file.toString().sort();
        input = input.split('').sort();
        // check for 0 length file
        if (input.length == 0) { return []; }
        // read file data and count frequencies
        freqList = [new Char(input[0], 1)];
        let idx = 0;
        for (let i = 1; i < input.length; ++i) {
            // see if character has already been added
            if (input[i] == input[i - 1]) { freqList[idx].freq++; }
            else { freqList[++idx] = new Char(input[i], 1); }
        }
    // });
    return freqList;
}

// returns the depth of the current node
function getDepth(node) {
    // is an actual node
    if (node.char === undefined) {
        return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
    }
    // is a char
    return 1;
}

// expands tree to be a full binary tree with null nodes where needed
function expandTree(tree) {
    let queue = [tree];
    let depth = getDepth(tree);  // depth of tree

    // running breadth first search to create null nodes where needed
    for (let level = 0; level < depth; ++level) {
        // need to run through 2^level nodes
        let numNodes = Math.pow(2, level);
        for (let nodeNum = 0; nodeNum < numNodes; ++nodeNum) {
            // pop node, give it children, and push child nodes
            let node = queue.shift();
            // if char => give "null" children
            if (node.left === undefined) {
                node.left = new Char(null, null);
                node.right = new Char(null, null);
            }
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    return tree;
}

// returns a string of the node, char, or null node
function toStringNode(node) {
    let space = "&nbsp;";

    // returns a string of the string padded with appropriate whitespace
    function padStr(str) {
        let len = str.length;
        return space.repeat(Math.ceil((5 - len) / 2)) + str + space.repeat(Math.floor((5 - len) / 2));
    }

    if (node.char === null) {  // null node
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } else if (node.char !== undefined) {  // char
        return padStr(node.freq + "-" + node.char);
    } else {  // node
        return padStr(node.freq + "");
    }
}

///////////////////
// i/o
///////////////////
// draws a binary tree of the huffman encoding
function drawTree(tag, tree) {
    // expanding tree
    tree = expandTree(tree);

    let depth = getDepth(tree);  // depth of tree

    // creating array of strings to store each rows output
    let pTags = [];
    for (let level = 0; level < depth; ++level) {
        pTags.push("");
    }

    // runs an inorder traversal on tree adding spaces where needed
    function inOrder(node, row) {
        // check for end of loop
        if (node.left !== undefined) {
            // call left child
            inOrder(node.left, row - 1);
            // insert necessary data into pTags array (spaces and freq)
            for (let r = 0; r < depth; ++r) {
                pTags[r] += (r == row ? toStringNode(node) : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            }
            // call right child
            inOrder(node.right, row - 1);
        }
    }

    inOrder(tree, depth - 1);

    // convert pTag strings to tags and append to div
    for (let level = depth - 1; level >= 0; --level) {
        let pTag = document.createElement('p');
        pTag.innerHTML = pTags[level];
        tag.appendChild(pTag);
    }
    
    return tag;
}

// outputs huffman encoding for tree given
function addEncoding(div, node) {
    function traverse(node, encoding) {
        // output encoding if char
        if (node.char !== undefined) {
            // add current encoding to div
            let tag = document.createElement('p');
            tag.innerHTML = node.char + " " + encoding;
            div.appendChild(tag);
        } else {  // char is end of tree => otherwise traverse child nodes
            traverse(node.left, encoding + "0");  // left adds 0
            traverse(node.right, encoding + "1");  // right adds 1
        }
    }
    
    traverse(node, "");

    return div;
}

// called by html button, computes and outputs huffman encoding
function computeHC() {
    // get input from list1, list2
    let chars = document.getElementById("chars").value;

    // checking for too large of input
    if (chars.length > 1000) {
        hcOut.innerHTML = "<h3 id=huffmanTable>Input Too Large (>1000 characters)</h3>";
        return; 
    }

    // getting frequencies of each character
    freqList = countFreq(chars);
    
    // constructing huffman tree
    freqList = freqList.sort((a, b) => a.freq - b.freq);  // sorting nodes in array by frequency
    tree = makeTree(freqList);

    // tags to hold huffman tree
    let div = document.createElement('div');
    let h3Tree = document.createElement('h3');
    let h3Encoding = document.createElement('h3');

    // adding id to div tag
    div.id = "huffmanTable"

    // adding encoding text to div
    h3Encoding.innerHTML = "The Huffman Encoding is:";
    div.appendChild(h3Encoding);

    // adding huffman encoding to div tag
    div = addEncoding(div, tree);

    // adding main text to div 
    h3Tree.innerHTML = "The corresponding Huffman Tree is (warning: tree levels may wrap):";  // "main text"
    div.appendChild(h3Tree);

    // constructing tree
    div =  drawTree(div, tree);

    // if div has already been attached => remove div
    if (document.getElementById("huffmanTable") !== null) {
        hc.removeChild(document.getElementById("huffmanTable"));
    }

    // appending div to html document
    hc.appendChild(div);
}