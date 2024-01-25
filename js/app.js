const text = document.querySelector(".text p"),
inpField = document.querySelector(".wrapper-text .input-field");
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer, maxTime = 60, timeLeft = maxTime;

let characterIndex = mistakes = isTyping = 0;

function randomParagraph() {

    //Generate random number less than the length of the texts array.
    let randomIndex = Math.floor(Math.random() * texts.length);
    
    text.innerHTML = "";

    //Getting random item from paragraph array, splitting all characters
    // of it, adding each character span and then adding this span inside p tag
    texts[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        text.innerHTML += spanTag;
    });

    text.querySelectorAll("span")[0].classList.add("active");

    // focussing on input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    text.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = text.querySelectorAll("span");
    let typedCharacter = inpField.value.split("")[characterIndex];
    
    if(characterIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) { //once timer is started, it won't restart again or every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        } 
    
        //If user hasn't entered any character or pressed backspace
        if(typedCharacter == null) {
            characterIndex--;
            //decrement mistakes only if the characterIndex has a class incorrect.
            if(characters[characterIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[characterIndex].classList.remove("correct","incorrect");
        } else {
            //if the user types a character which matches the given character then
            // add a class named CORRECT orelse increment tyhe mistakes and add a class named INCORRECT.
            if(characters[characterIndex].innerText === typedCharacter) {
                characters[characterIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[characterIndex].classList.add("incorrect");
            }
            characterIndex ++; //Increment the character index to check successive characters
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[characterIndex].classList.add("active");

        let wpm = Math.round((((characterIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        //if wpm value is 0, empty, or infinity then setting it's value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;

        mistakeTag.innerText = mistakes;
        cpmTag.innerText = characterIndex - mistakes; //cpm will not mistakes
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    //If timer is greater than 0 then decrement the timeLeft else clear the timer
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer)
        alert("Timer Finished")
    }
}

function resetApp() {
    //Calling loadParagraph function and
    // resetting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetApp);