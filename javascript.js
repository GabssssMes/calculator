function setButtons(){
    const numbers=document.querySelectorAll(".number");
    numbers.forEach(num => {
        num.addEventListener("click",()=>{
            arr.push(Number(num.id));
            display(num.id);
        });
    });
    const operators=document.querySelectorAll(".operator");
    operators.forEach(operator => {
        operator.addEventListener("click",()=>{
            if(arr.length>0){
                arr.push((operator.id));
                display(operator.id);
            }
        });
    });
    const dec=document.getElementById("dec");
    dec.addEventListener("click",function() {
        if(arr.length>0){
            arr.push(".");
            display(".");
        }
    });

    const min=document.getElementById("min");
    min.addEventListener("click",function() {
        arr.push("minus");
        display("-");
    });

    const equal=document.getElementById("=");
    equal.addEventListener("click",function() {
        if(arr.length>0){
            arr.push("=");
            display("=");
            calc();
        }
    });

    const del=document.getElementById("del");
    del.addEventListener("click",function() {
        if(arr.length>0){
            arr.pop();
            display("del");
        }
    });

    const clear=document.getElementById("clear");
    clear.addEventListener("click",function() {
        arr=[];
        display("clear");
    });

}
function calc(){
    let i,j=0,erg;
    let calcarr=[];
    for(i=0;i<arr.length;i++){
        if(typeof(arr[i])!="number"){
            if(arr[i]=="minus"){
                calcarr.push(arr[i]);
                j=i+1;
                continue;
            }
            if(calcarr[calcarr.length-1]=="minus"){
                calcarr.pop();
                calcarr.push(Number(arr.slice(j,i).join(""))*-1);
            }
            else calcarr.push(Number(arr.slice(j,i).join("")));
            calcarr.push(arr[i]);
            j=i+1;
        }
    }
    i=0;
    while(true){
        if(calcarr[i]=="**"){
            erg=power(calcarr[i-1],calcarr[i+1]);
            calcarr[i+1]=erg;
            calcarr.splice(i-1,2);
            i--;
            continue;
        }
        else if (calcarr[i]==="=")break;
        i++;
    }
    i=0;
    while(true){
        if(calcarr[i]==="*"){
            erg=mul(calcarr[i-1],calcarr[i+1]);
            calcarr[i+1]=erg;
            calcarr.splice(i-1,2);
            i--;
            continue;
        }
        else if(calcarr[i]=="/"){
            if(calcarr[i+1]==0){
                display("ERROR");
                return;
            }
            erg=div(calcarr[i-1],calcarr[i+1]);
            calcarr[i+1]=erg;
            calcarr.splice(i-1,2);
            i--;
            continue;
        }
        else if (calcarr[i]==="=")break;
        i++;
    }
    i=0;
    while(true){
        if(calcarr[i]=="+"){
            erg=add(calcarr[i-1],calcarr[i+1]);
            calcarr[i+1]=erg;
            calcarr.splice(i-1,2);
            i--;
            continue;
        }
        else if(calcarr[i]=="-"){
            erg=sub(calcarr[i-1],calcarr[i+1]);
            calcarr[i+1]=erg;
            calcarr.splice(i-1,2);
            i--;
            continue;
        }
        else if (calcarr[i]==="=")break;
        i++;
    }
    calcarr.pop();
    arr=[];
    arr.push(calcarr[0]);
    display(calcarr[0]);
    console.table(calcarr);

}
function add(num1,num2){
    return num1+num2;
}
function sub(num1,num2){
    return num1-num2;
}
function mul(num1,num2){
    return num1*num2;
}
function div(num1,num2){
    return num1/num2;
}
function power(num1,num2){
    return num1**num2;
}
function display(text){
    const disp=document.querySelector(".displaynew");
    const dispold=document.querySelector(".displayold");
    if(displaytext.length>50 && text!="="){
        return;
    }
    if(text=="del"){
        disp.removeChild(disp.lastChild);
        if(displaytext.length!=0)displaytext.pop();
        return;
    }
    else if(text=="clear"){
        disp.innerHTML="";
        dispold.innerHTML="";
        displaytext=[];
        return;
    }
    else if(text=="ERROR"){
        disp.innerHTML="ERROR";
        dispold.innerHTML="";
        displaytext=[];
        return;
    }
    displaytext.push(text);
    if(text=="="){
        disp.innerHTML="";
        dispold.innerHTML="";
        dispold.appendChild(document.createTextNode(displaytext.join("")));
        displaytext=[];
        return;
    }
    disp.appendChild(document.createTextNode(text));
}


let arr=[];displaytext=[];
setButtons();