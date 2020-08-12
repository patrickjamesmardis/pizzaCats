
let form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  checkThis(e);
  e.preventDefault();
});

const clientID = 'kdZ9KZUR_mOq07RxfoU8Hf0Phm-uR0xXYX8DQUf99TY';
const collectionID = '11710653';
const URL = `https://api.unsplash.com/photos/random?collections=${collectionID}&client_id=${clientID}`;
const pizzaTag = document.querySelector('div.pizza2');
const bodyTag = document.querySelector('body');
const startTextTag = document.querySelector('h2.startText');
const inputTag = document.querySelector('input');
const catTag = document.querySelector('img.cat');
let randImgId;
let descriptionText;
let userInputId;
let photoURL;
let numToppings = 4;
let currentTopping = 0;
let readyToStart = false;

const grabContent = async function() {
    const response = await fetch(URL);
    const data = await response.json();

    return data;
}


let descTag = document.querySelector('h2#descText');

function getImage() {

      grabContent().then(data => {
      descriptionText = data.alt_description;
      randImgId = data.id;
      photoURL = data.urls.thumb;
      descTag.innerHTML = descriptionText;
    });
  
}

function checkThis(event) {
    userInputId = event.srcElement[0].value.split('/').pop();
    inputTag.value = "";
    if (userInputId == randImgId) {
      console.log(photoURL);
      let newImg = document.createElement('img');
      newImg.setAttribute('src', photoURL);
      pizzaTag.appendChild(newImg);
      currentTopping++;
      if(currentTopping != numToppings) {getImage();}
      if(currentTopping == numToppings) {
        swal({
          title: "Congrats!",
          text: "You found all the ingredients to make the cat's pizza!",
          icon: "success",
          button: "Next"
        }).then(value => {
          if(value) {
            swal({
              text: "Ready to play again?", 
              button: "Yes!"
            }).then(val => {
              if(val) {
                location.reload();
              }
            });
          }
        });
      }
    } else {
      setTimeout(function(){
        swal({
          title: "Oops!",
          text: "Looks like you grabbed the wrong ingredient.",
          icon: "error",
          button: "Try again"
        });
      }, 1)
      
    }
}


document.querySelector("span.start").addEventListener("click", function () {
    catTag.classList.add("animate");
    setTimeout(function() {
      swal({
        title: "Uh oh!",
        text: "The cat starved waiting on their pizza",
        icon: "error",
        button: "Try again"
      }).then(value => {
        if(value) {
          location.reload();
        }
      })
    }, 150000);
    startTextTag.style.opacity = 0;
    pizzaTag.style.display = "block";
    inputTag.style.display = "initial";
    setTimeout(function(){ 
      startTextTag.style.display = "none"; 
      pizzaTag.style.opacity = 1;
      inputTag.style.opacity = 1;
      getImage();
    }, 300);
})