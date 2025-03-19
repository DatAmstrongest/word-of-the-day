// Making the fetch request
const changeBackground = () => {
  document.body.style.backgroundImage = "url('./assets/background/background-" + Math.ceil(Math.random() * 9) + ".jpg')";
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
        document.getElementById("word-title").innerHTML = doc3.getElementsByClassName("word-header-txt")[0].textContent
        document.getElementById("word-description").innerHTML = doc3.querySelector(".wod-definition-container p").textContent
        console.log("Response data:", data);  // Logging the response text
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

changeBackground();
getWord();