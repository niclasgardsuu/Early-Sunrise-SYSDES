// The data base for the UNDO-REDO mechanism is stored in two stacks
// Both of these are empty to start with.
//
let undostack = [];
let redostack = [];

// The UNDO-manager consists of three functions. In this version they are
// rudimentary, in that they don't check for an empty stack before trying.
// Adding these checks is an easy task.
//
// The UNDO-manager requires that the functions are stored as objects with three
// functions each: execute, unexecute and reexecute. Since the model is very
// small here, the functins are also necessarily simple. With more complex
// models, the functions for this will also grow.
//
// Note, however. that the undo-mechanism does not need to know anything
// about the model or the functions themselves. It just executes the appropriate
// function for the respective moments.
//
// ==========================================================================
// the doit function executes the function and then stores the function object
// on the UNDO-stack.
//
// Note that when a new function is executed, the REDO-stack has to be reset!
//
function doit(funcobj) {
    funcobj.execute();
    //remove the oldest function if the stack is larger than 10
    if(undostack.length == 10) {
        undostack.shift();
    }
    undostack.push(funcobj);
    redostack = [];
}


// ==========================================================================
// The undoit first pops the function object from the UNDO-stack, then executes
// UNDO-function and stores the function object on the REDO-stack.
//
function undoit() {
    if (undostack.length == 0) return;
    funcobj = undostack.pop();
    funcobj.unexecute();
    redostack.push(funcobj);
}

// ==========================================================================
// The redoit function pops the function object from the REDO-stack, executes
// the EXECUTE-function and then pushes the function object onto the UNDO-stack.
//
function redoit() {
    if (redostack.length == 0) return;

    funcobj = redostack.pop();
    funcobj.execute();
    undostack.push(funcobj);
}

