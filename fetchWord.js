// Making the fetch request
const changeBackground = () => {
  document.body.style.backgroundImage = "url('./assets/background/background-" + Math.ceil(Math.random() * 9) + ".jpg')";
}

const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getWord = () => {
  fetch("https://www.merriam-webster.com/word-of-the-day", {
    mode: "cors", // Ensures CORS is attempted (though Google may block it)
  })
    .then(response => {
      // Checking if response is successful
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
document.addEventListener("keydown", function (event) {
    if (event.key == "Backspace"){
      if (currentCol != 0){
          currentCol -= 1
          html_box = document.getElementById("box"+currentRow+"-"+currentCol);
          html_box.textContent = "";
      }
    }
    else if (event.key == "Enter"){
      currentRow +=1;
      currentCol = 0;
    }
    else{
      html_box = document.getElementById("box"+currentRow+"-"+currentCol);
      if (html_box != undefined){
        html_box.textContent = event.key;
        currentCol += 1;
      }
    }
});