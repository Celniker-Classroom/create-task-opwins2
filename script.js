// add javascript here
let finalSoreness = 0
let strain = 0
let freshness = 0
let rpe = 0
let listSore = []
let listStrain = []
let listFresh = []
document.getElementById("avgSoreness").style.visibility = "hidden";
document.getElementById("avgStrain").style.visibility = "hidden";
document.getElementById("avgRIR").style.visibility = "hidden";
document.getElementById("overallRPE").style.visibility = "hidden";
document.getElementById("feedback").style.visibility = "hidden";
document.getElementById("enterButton1").addEventListener("click", function() {
    let inputSoreness = document.getElementById("enteredSoreness").value.trim();
    let realSoreness = parseInt(inputSoreness, 10);
    if (inputSoreness === "" || isNaN(realSoreness)) {
        document.getElementById("question1").textContent = "Please enter a valid number 1-5!";
    }
    else if (realSoreness < 1 || realSoreness > 5) {
        document.getElementById("question1").textContent = "Answer must be between 1 and 5";
    }
    else {
        finalSoreness = realSoreness
        listSore.push(finalSoreness);
        document.getElementById("enterButton1").disabled = true;
        resetCheck();
    }
    
});
document.getElementById("enterButton2").addEventListener("click", function() {
    let inputStrain = document.getElementById("enteredStrain").value.trim();
    let realStrain = parseInt(inputStrain, 10);
    if (inputStrain === "" || isNaN(realStrain)) {
        document.getElementById("question2").textContent = "Please enter a valid number 1-5!";
    }
    else if (realStrain < 1 || realStrain > 5) {
        document.getElementById("question2").textContent = "Answer must be between 1 and 5";
    }
    else {
        strain = realStrain
        listStrain.push(strain);
        document.getElementById("enterButton2").disabled = true;
        resetCheck();
    }
    
});
document.getElementById("enterButton3").addEventListener("click", function() {
    let inputFreshness = document.getElementById("enteredFreshness").value.trim();
    let realFreshness = parseInt(inputFreshness, 10);
    if (inputFreshness === "" || isNaN(realFreshness)) {
        document.getElementById("question3").textContent = "Please enter a valid number 1-5!";
    }
    else if (realFreshness < 1 || realFreshness > 5) {
        document.getElementById("question3").textContent = "Answer must be between 1 and 5";
    }
    else {
        freshness = realFreshness
        listFresh.push(freshness);
        document.getElementById("enterButton3").disabled = true;
        resetCheck();
    }
    
});

function resetCheck() {
    if (document.getElementById("enterButton3").disabled == true && document.getElementById("enterButton2").disabled == true && document.getElementById("enterButton1").disabled == true) {
        document.getElementById("resetSurveyButton").disabled = false;
    }}

document.getElementById("resetSurveyButton").addEventListener("click", function() {
    document.getElementById("enterButton1").disabled = false;
    document.getElementById("enterButton2").disabled = false;
    document.getElementById("enterButton3").disabled = false;
    document.getElementById("resetSurveyButton").disabled = true;
    document.getElementById("question1").textContent = "How sore were you this morning? Enter a number 1-5:";
    document.getElementById("question2").textContent = "How physcially demanding was practice today? Enter a number 1-5:";
    document.getElementById("question3").textContent = "How fresh do you feel (could you have practiced longer/harder)? Enter a number 1-5:";
    document.getElementById("enteredSoreness").value = "";
    document.getElementById("enteredStrain").value = "";
    document.getElementById("enteredFreshness").value = "";
    document.getElementById("athleteTitle").textContent = "Pass the device to the next athlete!";
});

document.getElementById("displayDataButton").addEventListener("click", function() {
    let averageSore = 0
    let averageStrain = 0
    let averageFresh = 0
    document.getElementById("avgSoreness").style.visibility = "visible";
    document.getElementById("avgStrain").style.visibility = "visible";
    document.getElementById("avgRIR").style.visibility = "visible";
    document.getElementById("overallRPE").style.visibility = "visible";
    document.getElementById("feedback").style.visibility = "visible";
    for (let i = 0; i < listSore.length; i++) {
        averageSore += listSore[i]
    }
    for (let i = 0; i < listStrain.length; i++) {
        averageStrain += listStrain[i]
    }
    for (let i = 0; i < listFresh.length; i++) {
        averageFresh += listFresh[i]
    }
    averageSore = averageSore / listSore.length
    averageStrain = averageStrain / listStrain.length
    averageFresh = averageFresh / listFresh.length
    document.getElementById("avgSoreness").textContent = "Average Soreness: " + averageSore.toFixed(2);
    document.getElementById("avgStrain").textContent = "Average Strain: " + averageStrain.toFixed(2);
    document.getElementById("avgRIR").textContent = "Average Freshness: " + averageFresh.toFixed(2);
    rpe = (averageSore * 0.2 + averageStrain * 0.3 + averageFresh * 0.5) * 2;
    document.getElementById("overallRPE").textContent = "Overall RPE: " + rpe.toFixed(2);
    feedback();
});

function feedback() {
    if (rpe < 3) {
        document.getElementById("feedback").textContent = "Feedback: Your team is undertraining, consider increasing the intensity or duration of your practices.";
    }
    else if (rpe >= 3 && rpe < 5) {
        document.getElementById("feedback").textContent = "Feedback: Your team is slightly undertraining, consider increasing the intensity or duration of your practices.";
    }
    else if (rpe >= 5 && rpe < 8) {
        document.getElementById("feedback").textContent = "Feedback: Your team is training at an optimal level, keep up the good work!";
    }
    else if (rpe >= 8 && rpe < 9) {
        document.getElementById("feedback").textContent = "Feedback: Your team is slightly overtraining, consider decreasing the intensity or duration of your practices.";
    }
    else {
        document.getElementById("feedback").textContent = "Feedback: Your team is overtraining, consider significantly decreasing the intensity or duration of your practices and incorporating more rest days.";
    }
};