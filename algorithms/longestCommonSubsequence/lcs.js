///////////////////
// globals
///////////////////
// document tags to display compare values
let tag1 = document.getElementById("tag1");
let tag2 = document.getElementById("tag2");
let lcsOut = document.getElementById("lcsOut");

///////////////////
// recursive approach to lcs
///////////////////
// longest common subsequence
function lcsRec(l, r, lIdx, rIdx) {
    let iter = 0;  // iterations for lcs

    // recursive function to run lcs algorithm
    function lcs(l, r, lIdx, rIdx) {
        iter++;

        // idx == -1 => end of check
        if (lIdx == -1 || rIdx == -1) { return {"len": 0, "list": []}; }

        // val's == => add one, return and decrement both
        let obj;
        if (l[lIdx] == r[rIdx]) { 
            // lcs computation
            obj = lcs(l, r, lIdx - 1, rIdx - 1);
            obj.len++;
            obj.list.push(l[lIdx]);
        } else {  // return greater of two
            // lcs computation
            let lhs = lcs(l, r, lIdx - 1, rIdx);
            let rhs = lcs(l, r, lIdx, rIdx - 1);
            obj = (lhs.len > rhs.len) ? lhs : rhs;
        }

        return obj;
    }

    // run lcs recursive algorithm
    let z = lcs(l, r, lIdx, rIdx);
    
    return {"iter": iter, "list": z.list};
}

///////////////////
// dynamic approach to lcs
///////////////////
// creates array for lcsDyn
function fillAry(list1, list2, lLen, rLen) {
    // count number of iterations
    let iter = 0;

    // construct array and fill with 0's
    let ary = [[]];
    let lcsRow = lLen + 1;
    let lcsCol = rLen + 1;

    // update values according to matches
    for (let i = 0; i <= lcsRow; ++i) {
        // adding column to array
        ary[i] = [];
        for (let j = 0; j <= lcsCol; ++j) {
            iter++;

            if (i == 0 || j == 0) {
                ary[i][j] = 0;
                continue;
            }
            // i == j
            if (list1[i - 1] == list2[j - 1]) { ary[i][j] = ary[i - 1][j - 1] + 1; }
            // i != j
            else {
                let lhs = ary[i][j - 1];
                let rhs = ary[i - 1][j];
                ary[i][j] = lhs > rhs ? lhs : rhs;
            }
        }
    }

    return {"iter": iter, "ary": ary};
}

// longest common subsequence dynamic approach
function lcsDyn(l, r, lIdx, rIdx) {
    let lcs = fillAry(l, r, lIdx, rIdx);  // filling array with paths dynamically
    let lcsAry = lcs.ary;
    let iter = lcs.iter;  // iterations for dynIter
    let z = [];  // final list of lcs

    while (lIdx >= 0 && rIdx >= 0) {
        iter++;

        // i == j => push to list
        if (l[lIdx] == r[rIdx]) { 
            z.push(l[lIdx]); 
            lIdx--;
            rIdx--;
        } else if (lcsAry[lIdx + 1][rIdx] > lcsAry[lIdx][rIdx + 1]) {
            rIdx--;
        } else {
            lIdx--;
        }
    }

    return {"iter": iter, "list": z.reverse()};
}

// converts a list into a nice string to output
function listToString(list) {
    let len = list.length;
    let str = "";
    for (let i = 0; i < len; ++i) {
        str += list[i];
        str += (i < len - 1) ? ", " : "";
    }
    return str;
}

// called by html button, computes and outputs lcs
function computeLCS() {
    // get input from list1, list2
    let str1 = document.getElementById("list1").value;
    let str2 = document.getElementById("list2").value;

    // checking for too large of input
    if (str1.length > 100 || str2.length > 100) {
        lcsOut.innerHTML = "<h3>Input Too Large (>100)</h3>";
        return; 
    }

    // remove all whitespace
    str1 = str1.split(" ").join("");
    str2 = str2.split(" ").join("");

    // separate by ,
    let list1 = str1.split(",");
    let list2 = str2.split(",");

    // running methods and outputting data
    let recursive = lcsRec(list1, list2, list1.length - 1, list2.length - 1);
    let dynamic = lcsDyn(list1, list2, list1.length - 1, list2.length - 1);

    // constructing output
    let recStr = listToString(recursive.list);
    let dynStr = listToString(dynamic.list);
    let recTag = `<h3>Recursive Approach:</h3> <p>Function Iterations: ${recursive.iter}</p> <p>LCS: ${recStr}</p> <p>Length: ${recursive.list.length}</p>`;
    let dynTag = `<h3>Dynamic Approach:</h3> <p>Loop Iterations: ${dynamic.iter}</p> <p>LCS: ${dynStr}</p> <p>Length: ${dynamic.list.length}</p>`;
    lcsOut.innerHTML = recTag + "<br>" + dynTag;
}