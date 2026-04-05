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
 const html_container = document.getElementsByClassName("container").item(0);
 for (var i=0; i<word_length; i++){
    html_box = document.createElement("div");
    html_box.classList.add("box")
    html_box.setAttribute("id", "box"+i);
    html_container.appendChild(html_box);
 }

}



changeBackground();
getWord();
var currentIndex = 0;
document.addEventListener("keydown", function (event) {
    if (event.key == "Backspace"){
      if (currentIndex != 0){
          currentIndex -= 1
          html_box = document.getElementById("box"+currentIndex);
          html_box.textContent = "";
      }
    }
    else if (event.key == "Enter"){
      return;
    }
    else{
      html_box = document.getElementById("box"+currentIndex);
      if (html_box != undefined){
        html_box.textContent = event.key;
        currentIndex += 1;
      }
    }
});