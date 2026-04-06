const changeBackground = () => {
  document.body.style.backgroundImage = "url('./assets/background/background-" + Math.ceil(Math.random() * 9) + ".jpg')";
}

const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

var target_word = "";

const getWord = () => {
  fetch("https://www.merriam-webster.com/word-of-the-day", {
    mode: "cors", 
  })
    .then(response => {
      if (response.ok) {
        return response.text();  // Parsing the response body
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
        const parser = new DOMParser();
        const doc3 = parser.parseFromString(data, "text/html");
        const word = doc3.getElementsByClassName("word-header-txt")[0].textContent
        const definition = doc3.querySelector(".wod-definition-container p").textContent
        const changed_definition = definition.replace(capitalizeFirstLetter(word), "This word");
        //document.getElementById("word-title").innerHTML = 
        document.getElementById("word-description").innerHTML = changed_definition;
        target_word = word.toUpperCase();
        createGame(word);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

const createGame = (word) => {
  const word_length =  word.length
  for (var row=0; row<word_length; row++){
    html_container = document.createElement("div");
    html_container.classList.add("container");
    for (var col=0; col<word_length; col++){
      html_box = document.createElement("div");
      html_box.classList.add("box")
      html_box.setAttribute("id", "box"+row+"-"+col);
      html_container.appendChild(html_box);
    }
    document.body.appendChild(html_container);
  }
}

changeBackground();
getWord();

var currentCol = 0;
var currentRow = 0;
var guessed_word = "";

document.addEventListener("keydown", async function (event) {
    if (event.key == "Backspace"){
      if (currentCol != 0){
          guessed_word = guessed_word.substring(0, guessed_word.length-1);
          currentCol -= 1
          html_box = document.getElementById("box"+currentRow+"-"+currentCol);
          html_box.textContent = "";
      }
    }
    else if (event.key == "Enter"){
      await checkWord();
      currentRow +=1;
      currentCol = 0;
    }
    else{
      html_box = document.getElementById("box"+currentRow+"-"+currentCol);
      if (html_box != undefined){
        guessed_word += event.key.toUpperCase();
        html_box.textContent = event.key.toUpperCase();
        currentCol += 1;
      }
    }
});

const  checkWord = async () => {
  for (var i=0; i<target_word.length; i++){
    if (target_word.at(i) == guessed_word.at(i)){
      html_box = document.getElementById("box"+currentRow+"-"+i);
      html_box.classList.add("flip");
      await new Promise(r => setTimeout(r, 400));
      html_box.classList.add("active");
      await new Promise(r => setTimeout(r, 400));
    }
    else{
      console.log("a")
    }

  }

}