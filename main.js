let form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  checkThis(e);
  e.preventDefault();
});

const clientID = 'EigRCiVF8VURsycALQfO4ud80VysLkWYbJplf5RcZh0';
const collectionID = '11710653';
const URL = `https://api.unsplash.com/photos/random?collections=${collectionID}&client_id=${clientID}`;
let randImgId;
let descriptionText;
let userInputId;

const grabContent = async function() {
    const response = await fetch(URL);
    const data = await response.json();

    return data;
}


let divTag = document.querySelector('div#descText');

grabContent().then(data => {
    descriptionText = data.alt_description;
    randImgId = data.id;
    divTag.innerHTML = descriptionText + "<br> Correct Image Id:" + randImgId;
    console.log(descriptionText);
    
});

function checkThis(event) {
    userInputId = event.srcElement[0].value.split('/').pop();
    if (userInputId == randImgId) {
      document.querySelector('body').style.backgroundColor = "green";
    } else {
      document.querySelector('body').style.backgroundColor = "red";
    }
}
