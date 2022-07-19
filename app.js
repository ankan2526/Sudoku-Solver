// Sudoku Solver
// author: ankan2526

function displayNoSolution(){
    message.innerText = 'No Solution Found!!';
    message.style.color = "red";
}

function updateSolution(arr){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(cell[i*9+j].innerText == ''){
                cell[i*9+j].innerText = arr[i][j];
            }
        }
    }
    message.innerHTML = "Solution Found!";
    message.style.color = "green";
}

function solveSudoku(){
    function check(){
        if(todo.length==0){
            updateSolution(arr);
            return 1;
        }
        let p = todo.pop();
        let x=p[0],y=p[1];
        for(let i=0;i<9;i++){
            if(hlines[x][i]==0 && vlines[y][i]==0 
                && boxes[Math.floor(x/3)][Math.floor(y/3)][i]==0){
                    hlines[x][i] = 1;
                    vlines[y][i] = 1;
                    boxes[Math.floor(x/3)][Math.floor(y/3)][i]=1;
                    arr[x][y] = i+1;
                    if(check()==1){
                        return 1;
                    }
                    hlines[x][i] = 0;
                    vlines[y][i] = 0;
                    boxes[Math.floor(x/3)][Math.floor(y/3)][i]=0;
                    arr[x][y] = 0;
                }
        }
        todo.push([x,y]);
        return 0;
    }

    let arr = [];
    let todo = [];
    let hlines = [];
    let vlines = [];
    let boxes = [[],[],[]]
    for(let i=0;i<9;i++){
        arr.push([0,0,0,0,0,0,0,0,0]);
        hlines.push([0,0,0,0,0,0,0,0,0]);
        vlines.push([0,0,0,0,0,0,0,0,0]);
        const x = Math.floor(i/3);
        boxes[x].push([0,0,0,0,0,0,0,0,0])
    }
    let maxx = 0
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(cell[i*9+j].innerText == ''){
                todo.push([i,j]);
            }
            else{
                arr[i][j] = Number(cell[i*9+j].innerText);
                hlines[i][arr[i][j]-1] += 1;
                vlines[j][arr[i][j]-1] += 1;
                boxes[Math.floor(i/3)][Math.floor(j/3)][arr[i][j]-1] += 1;
                maxx = Math.max(maxx,hlines[i][arr[i][j]-1],vlines[i][arr[i][j]-1],
                    boxes[Math.floor(i/3)][Math.floor(j/3)][arr[i][j]-1]);
            }
        }
    }
    if(maxx>1){
        displayNoSolution();
        console.log("No");
        return;
    }
    if(check(todo,hlines,vlines,boxes,arr)==0){
        displayNoSolution();
        console.log('No');
    }
}


function switchKeypad(c){
    if(currentCell==null){
        currentCell = c;
        c.style.backgroundColor = "red";
        keypad.style.visibility = "initial";
    }
    else{
        keypad.style.visibility = "hidden"
        currentCell.style.backgroundColor = "";
        currentCell = null;
    }

}


function execute(){
    for(let i=0;i<cell.length;i++){
        cell[i].addEventListener('click',function(){
            switchKeypad(cell[i]);
        })
    }
    
    solve.addEventListener('click',function(){
        solveSudoku();
    });

    reset.addEventListener('click',()=>{
        message.innerText = '';
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                cell[i*9+j].innerHTML = '';
            }
        }
    })
}


// All elements
const cell = document.querySelectorAll(".sudoku td");
const keypad = document.querySelector(".keypad");
const key = document.querySelectorAll(".keypad td");
const solve = document.querySelector(".solve");
const message = document.querySelector(".message");
const reset = document.querySelector(".reset");

let currentCell = null;

for(let i=0;i<key.length;i++){
    key[i].addEventListener('click',async function(){
        if(i==9){
            currentCell.innerHTML = "";
        }
        else{
            currentCell.innerHTML = `<b> ${i+1} </b>`;
        }
        currentCell.style.backgroundColor = "";
        currentCell = null;
        keypad.style.visibility = "hidden";
        return;
    })
}


execute();