var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var gradeBounds;

function initializeGradeBounds(){
    gradeBounds = {
        MaxInput: Number(document.getElementById("MaxInput").value),
        APlusInput: Number(document.getElementById("APlusInput").value),
        AInput: Number(document.getElementById("AInput").value),
        AMinusInput: Number(document.getElementById("AMinusInput").value),
        BPlusInput: Number(document.getElementById("BPlusInput").value),
        BInput: Number(document.getElementById("BInput").value),
        BMinusInput: Number(document.getElementById("BMinusInput").value),
        CPlusInput: Number(document.getElementById("CPlusInput").value),
        CInput: Number(document.getElementById("CInput").value),
        CMinusInput: Number(document.getElementById("CMinusInput").value),
        DInput: Number(document.getElementById("DInput").value),
        FInput: Number(document.getElementById("FInput").value),
    }
}

var histogramValues = {
    Aplus: 0,
    A: 0,
    Aminus: 0,
    Bplus: 0,
    B: 0,
    Bminus: 0,
    Cplus: 0,
    C: 0,
    Cminus: 0,
    D: 0,
    F: 0,

}

function groupGrades(){
    initializeGradeBounds();

    for(var i=0; i<grades.length; i++){
        switch(true){
            case grades[i] <= gradeBounds.MaxInput && grades[i] >= gradeBounds.APlusInput:
                histogramValues.Aplus += 1;
                break;

            case grades[i] < gradeBounds.APlusInput && grades[i] >= gradeBounds.AInput:
                histogramValues.A += 1;
                break;

            case grades[i] < gradeBounds.AInput && grades[i] >= gradeBounds.AMinusInput:
                histogramValues.Aminus += 1;
                break;

            case grades[i] < gradeBounds.AMinusInput && grades[i] >= gradeBounds.BPlusInput:
                histogramValues.Bplus += 1;
                break;

            case grades[i] < gradeBounds.BPlusInput && grades[i] >= gradeBounds.BInput:
                histogramValues.B += 1;
                break;

            case grades[i] < gradeBounds.BInput && grades[i] >= gradeBounds.BMinusInput:
                histogramValues.Bminus += 1;
                break;

            case grades[i] < gradeBounds.BMinusInput && grades[i] >= gradeBounds.CPlusInput:
                histogramValues.Cplus += 1;
                break;

            case grades[i] < gradeBounds.CPlusInput && grades[i] >= gradeBounds.CInput:
                histogramValues.C += 1;
                break;

            case grades[i] < gradeBounds.CInput && grades[i] >= gradeBounds.CMinusInput:
                histogramValues.Cminus += 1;
                break;

            case grades[i] < gradeBounds.CMinusInput && grades[i] >= gradeBounds.DInput:
                histogramValues.D += 1;
                break;

            case grades[i] < gradeBounds.DInput && grades[i] >= gradeBounds.FInput:
                histogramValues.F += 1;
                break;
        }
    }

    //insert value into histogram and reset
    document.getElementById("Aplus").innerHTML = histogramValues.Aplus;
    histogramValues.Aplus = 0;

    document.getElementById("A").innerHTML = histogramValues.A;
    histogramValues.A = 0;

    document.getElementById("Aminus").innerHTML = histogramValues.Aminus;
    histogramValues.Aminus = 0;

    document.getElementById("Bplus").innerHTML = histogramValues.Bplus;
    histogramValues.Bplus = 0;

    document.getElementById("B").innerHTML = histogramValues.B;
    histogramValues.B = 0;

    document.getElementById("Bminus").innerHTML = histogramValues.Bminus;
    histogramValues.Bminus = 0;

    document.getElementById("Cplus").innerHTML = histogramValues.Cplus;
    histogramValues.Cplus = 0;

    document.getElementById("C").innerHTML = histogramValues.C;
    histogramValues.C = 0;

    document.getElementById("Cminus").innerHTML = histogramValues.Cminus;
    histogramValues.Cminus = 0;

    document.getElementById("D").innerHTML = histogramValues.D;
    histogramValues.D = 0;

    document.getElementById("F").innerHTML = histogramValues.F;
    histogramValues.F = 0;

}

var errorMessage = document.getElementById("error-alert")

function submitGrade(){
    var inputValue = document.getElementById("newGradeInput").value
    if(Number(inputValue) < 0){
        errorMessage.innerHTML = "Your input value is not valid, less than 0"
        return;
    }

    if(inputValue === ""){
        errorMessage.innerHTML = "Your input value is not a number";
        return;
    }

    if(Number(inputValue) > gradeBounds.MaxInput){
        errorMessage.innerHTML = "Your input value is not valid, your input exceeds the maximum grade bound";
        return
    }
    errorMessage.innerHTML = ""
    grades.push(Number(inputValue));
    groupGrades();
}


function changeBounds(event){
    var target = Number(event.target.value)
    var grades = document.getElementsByClassName("bound-input");
    
    if(target === Number(grades[0].value)){
        if(target <= Number(grades[1].value)){
            errorMessage.innerHTML = "Invalid bounds - you have overlap with grade bounds below"
        }
        errorMessage.innerHTML = ""
        return;
    }

    if(target === Number(grades[11].value)){
        if(target < 0 || target >= Number(grades[11].value)){
            errorMessage.innerHTML = "Invalid bound - cannot have a grade less than 0"
        }
        errorMessage.innerHTML = ""
        return;
    }

    for(var i=1; i<grades.length-1; i++){
        if(target === Number(grades[i].value)){
            if(target >= Number(grades[i-1].value) || target <= Number(grades[i+1].value) ){
                errorMessage.innerHTML = "Invalid bounds - you have overlap with other grade bounds. check to see if the input you changed is greater/equal to the inputs above it or less/equal to the inputs below it"
                return;
            }
        }
    }
    errorMessage.innerHTML = ""
    groupGrades()
}

window.addEventListener('load', (event) => {
    groupGrades();
})