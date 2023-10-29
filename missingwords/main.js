document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("text");
    const startButton = document.getElementById("startButton");
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");

    // Define an object to store the selected words
    const selectedWords = {};

    // Define possible options for each missing word
    const wordOptions = {
        word1: ["endured throughout", "captured taugets", "killed insects", "darkened the night"],
        word2: ["funny", "tasty", "piteously"],
        word3: ["who", "dark", "dart"],
        word4: ["forth issued from the sea", "so that the firm foot", "which with a spotted", "heart’s lake had endured", "him were, what time the love"],
        word5: ["hidden", "shimmered", "vanished"],
    };

    // Function to generate a Base64 string
    const generateBase64 = () => {
        const text = textElement.textContent;
        const data = {
            // text,
            selectedWords,
        };
        const jsonStr = JSON.stringify(data);
        const base64String = btoa(encodeURIComponent(jsonStr));
        
        // Create a text area element to hold the Base64 string
        const textArea = document.createElement('textarea');
        textArea.value = base64String;
        document.body.appendChild(textArea);
        textArea.select(); 
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log("Base64 String: ", base64String);
         alert("Base64 String: " + base64String+"\nBase64 String has been copied to the clipboard.");
        // alert("Base64 String has been copied to the clipboard.");
        
    };

    // Function to copy all text to the clipboard
    const copyText = () => {
        if (Object.keys(selectedWords).length === 5) {
            const textToCopy = textElement.textContent;
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("Text copied to the clipboard.");
        } else {
            alert("Please select all missing words before copying.");
        }
    };

    // Function to start the game
    const startGame = () => {
        startButton.style.display = "none"; // Hide the "Start Game" button
        generateButton.disabled = false;

        // Add click event listeners to each missing word
        const missingWords = document.querySelectorAll(".missing-word");
        missingWords.forEach(wordElement => {
            const word = wordElement.getAttribute("data-word");
            const options = wordOptions[word];

            wordElement.addEventListener("click", () => {
                if (wordElement.classList.contains("answered")) {
                    
                    // If the word has already been answered, clear the answer
                    wordElement.textContent = "__________";
                    wordElement.classList.remove("answered");
                    delete selectedWords[word];
                } else {
                wordElement.classList.add('clicked');

                    // If the word hasn't been answered, display options
                    const optionsList = document.createElement("ul");
                    optionsList.classList.add('list');
                    options.forEach(option => {
                        const optionItem = document.createElement("li");
                        optionItem.innerText = option;
                        optionsList.appendChild(optionItem);
                        optionItem.addEventListener("click", () => {
                            wordElement.classList.add('answered')
                            wordElement.innerHTML = option;
                            selectedWords[word] = option;
                            optionsList.remove();
                        });
                    });
                    // Append the options list to the parent element
                    wordElement.after(optionsList);
                }
            });
        });
    };


    
    // Add click event listener to start button
    startButton.addEventListener("click", startGame);

    // Add click event listener to generate button
    generateButton.addEventListener("click", generateBase64);

    // Add click event listener to copy button
    copyButton.addEventListener("click", copyText);
});
