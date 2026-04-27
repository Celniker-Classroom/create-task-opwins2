// Initialize global variables for tracking survey data
let finalSoreness = 0
let strain = 0
let freshness = 0
let rpe = 0
let athleteCount = 0
let surveyCount = 0

// Hide result elements initially on page load
document.getElementById("avgSoreness").style.visibility = "hidden";
document.getElementById("avgStrain").style.visibility = "hidden";
document.getElementById("avgRIR").style.visibility = "hidden";
document.getElementById("overallRPE").style.visibility = "hidden";
document.getElementById("feedback").style.visibility = "hidden";
document.getElementById("totalFormResetButton").style.visibility = "hidden";
// Handle soreness input validation and data update
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
        updateData(finalSoreness, "soreness");
        resetCheck();
    }
    
});
let listSore = []
let listStrain = []
let listFresh = []

// Update data lists and disable corresponding buttons
function updateData(response, type) {
    const types = ["soreness", "strain", "freshness"];
    const lists = [listSore, listStrain, listFresh];
    const buttonIds = ["enterButton1", "enterButton2", "enterButton3"];

    for (let i = 0; i < types.length; i++) {
        if (types[i] === type) {
            lists[i].push(response);
            document.getElementById(buttonIds[i]).disabled = true;
            break;
        }
    }
}

// Handle strain input validation and data update
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
        updateData(strain, "strain");
        resetCheck();
    }
    
});

// Handle freshness input validation and data update
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
        updateData(freshness, "freshness");
        resetCheck();
    }
    
});

// Set the total number of athletes for survey
document.getElementById("setAthleteCountButton").addEventListener("click", function() {
    let inputCount = document.getElementById("athleteCountInput").value.trim();
    let realCount = parseInt(inputCount, 10);
    if (inputCount === "" || isNaN(realCount) || realCount <= 0) {
        document.getElementById("athleteCountLabel").textContent = "Please enter a valid positive number for athlete count!";
    } else {
        athleteCount = realCount;
        document.getElementById("athleteCountSection").style.display = "none";
    }
});

// Check if all inputs are done to enable reset
function resetCheck() {
    if (document.getElementById("enterButton3").disabled == true && document.getElementById("enterButton2").disabled == true && document.getElementById("enterButton1").disabled == true) {
        document.getElementById("resetSurveyButton").disabled = false;
    }}

// Invert freshness scale for calculation purposes
function invertFreshness(value) {
    return 6 - value;
}

// Reset form for next athlete's survey input
document.getElementById("resetSurveyButton").addEventListener("click", function() {
    surveyCount++;
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

// Check survey completion and handle data display
document.getElementById("displayDataButton").addEventListener("click", function() {
    if (surveyCount === athleteCount) {
        displayData();
    } else if (surveyCount < athleteCount) {
        let missing = athleteCount - surveyCount;
        document.getElementById("athleteTitle").textContent = `Warning: Only ${surveyCount} out of ${athleteCount} athletes have completed the survey (${missing} missing).`;
        document.getElementById("warningMessage").textContent = `Only ${surveyCount} out of ${athleteCount} athletes have completed the survey.`;
        document.getElementById("displayYes").checked = false;
        document.getElementById("displayNo").checked = false;
        document.getElementById("mismatchWarning").style.display = "block";
    }
    else {
        document.getElementById("athleteTitle").textContent = `Warning: More surveys completed (${surveyCount}) than the number of athletes (${athleteCount}). Please check the athlete count and survey count.`;
        document.getElementById("warningMessage").textContent = `More surveys completed (${surveyCount}) than the number of athletes (${athleteCount}). Please check the athlete count and survey count.`;
        document.getElementById("displayYes").checked = false;
        document.getElementById("displayNo").checked = false;
        document.getElementById("mismatchWarning").style.display = "block";
    }
});

// Calculate and display survey averages and RPE
function displayData() {
    let averageSore = 0
    let averageStrain = 0
    let averageFresh = 0
    document.getElementById("avgSoreness").style.visibility = "visible";
    document.getElementById("avgStrain").style.visibility = "visible";
    document.getElementById("avgRIR").style.visibility = "visible";
    document.getElementById("overallRPE").style.visibility = "visible";
    document.getElementById("feedback").style.visibility = "visible";
    document.getElementById("totalFormResetButton").style.visibility = "visible";
    document.getElementById("displayYes").checked = false;
    document.getElementById("displayNo").checked = false;
    for (let i = 0; i < listSore.length; i++) {
        averageSore += listSore[i]
    }
    for (let i = 0; i < listStrain.length; i++) {
        averageStrain += listStrain[i]
    }
    for (let i = 0; i < listFresh.length; i++) {
        averageFresh += invertFreshness(listFresh[i]);
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
};

// Reset entire form for new session
document.getElementById("totalFormResetButton").addEventListener("click", function() {
    listSore = []
    listStrain = []
    listFresh = []
    surveyCount = 0
    athleteCount = 0
    document.getElementById("avgSoreness").style.visibility = "hidden";
    document.getElementById("avgStrain").style.visibility = "hidden";
    document.getElementById("avgRIR").style.visibility = "hidden";
    document.getElementById("overallRPE").style.visibility = "hidden";
    document.getElementById("feedback").style.visibility = "hidden";
    document.getElementById("totalFormResetButton").style.visibility = "hidden";
    document.getElementById("athleteTitle").textContent = "(Athlete) Practice Strain Report";
    document.getElementById("athleteCountSection").style.display = "block";
    document.getElementById("displayYes").checked = false;
    document.getElementById("displayNo").checked = false;
    document.getElementById("athleteCountInput") = "";
});

// Handle user confirmation to display data anyway
document.getElementById("displayYes").addEventListener("change", function() {
    if (this.checked) {
        displayData();
        document.getElementById("mismatchWarning").style.display = "none";
        document.getElementById("displayYes").checked = false;
        document.getElementById("displayNo").checked = false;
        document.getElementById("athleteTitle").textContent = "(Athlete) Practice Strain Report";
    }
});

// Handle user choice to not display incomplete data
document.getElementById("displayNo").addEventListener("change", function() {
    if (this.checked) {
        document.getElementById("mismatchWarning").style.display = "none";
        document.getElementById("displayYes").checked = false;
        document.getElementById("displayNo").checked = false;
        document.getElementById("athleteTitle").textContent = "(Athlete) Practice Strain Report";
    }
});

// Provide training feedback based on calculated RPE
function feedback() {
    const feedbackElement = document.getElementById("feedback");
    // Remove any existing feedback classes
    feedbackElement.classList.remove("feedback-optimal", "feedback-undertraining", "feedback-slightly-under", "feedback-slightly-over", "feedback-overtraining");
    
    if (rpe < 3) {
        feedbackElement.textContent = "Feedback: Your team is undertraining, consider increasing the intensity or duration of your practices.";
        feedbackElement.classList.add("feedback-undertraining");
    }
    else if (rpe >= 3 && rpe < 5) {
        feedbackElement.textContent = "Feedback: Your team is slightly undertraining, consider increasing the intensity or duration of your practices.";
        feedbackElement.classList.add("feedback-slightly-under");
    }
    else if (rpe >= 5 && rpe < 8) {
        feedbackElement.textContent = "Feedback: Your team is training at an optimal level, keep up the good work!";
        feedbackElement.classList.add("feedback-optimal");
    }
    else if (rpe >= 8 && rpe < 9) {
        feedbackElement.textContent = "Feedback: Your team is slightly overtraining, consider decreasing the intensity or duration of your practices.";
        feedbackElement.classList.add("feedback-slightly-over");
    }
    else {
        feedbackElement.textContent = "Feedback: Your team is overtraining, consider significantly decreasing the intensity or duration of your practices and incorporating more rest days.";
        feedbackElement.classList.add("feedback-overtraining");
    }
};