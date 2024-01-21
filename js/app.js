const text = document.querySelector(".text p");

function randomParagraph() {

    //Generate random number less than the length of the texts array.
    let randomIndex = Math.floor(Math.random() * texts.length);
    
    //Getting random item from paragraph array, splitting all characters
    // of it, adding each character span and then adding this span inside p tag
    texts[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        text.innerHTML += spanTag;
    });
}

randomParagraph();