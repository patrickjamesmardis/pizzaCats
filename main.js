
let form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  checkThis(e);
  e.preventDefault();
});





const clientIDS = ['xmDek0kpX34wNIPlo5ycILQkfW9STveVgjfpd6g_jos', 'EigRCiVF8VURsycALQfO4ud80VysLkWYbJplf5RcZh0', 'kdZ9KZUR_mOq07RxfoU8Hf0Phm-uR0xXYX8DQUf99TY', '3cj0DSNrv4NoOC9knFqZ2svGM6WanvDlWItYS84rDio', '8W-BD97jMJqv7xBXvQZp3vbDILhyBlLpBpvo2Qi90Xc', 'pfdTsxP_d22ifotijVSuf4ILRGw_rYwynK4MejlUZJk', '2HdOQu2EmCstUcP8xt4ZslWmK-Ib0rI0FiFE9H4qNBo', 'KKvesqQTBU8sPgV5G1t1WY4ddJa7gP1xOsFeVInsoVs', 'wU3m-RIiacyPL9Y4wYCvq6QLMJ3eD1I-Tk0XqYJGs58', 'hf97glauGLqwxeGmgngPkiwb9CWsC74uVqGWJUJ6Il0'];
let cIDIndex = 0;
const collectionID = '11710653';
let URL = `https://api.unsplash.com/photos/random?collections=${collectionID}&client_id=${clientIDS[cIDIndex]}`;
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
  }).catch(function() {
    cIDIndex++;
    URL = `https://api.unsplash.com/photos/random?collections=${collectionID}&client_id=${clientIDS[cIDIndex]}`;
    getImage();

    if(cIDIndex >= clientIDS.length) {
      swal({
        title: "Sorry!",
        text: "It looks like we've used all of our Unsplash API calls for this hour. Try again in a bit.",
        button: false,
        icon: "error"
      });
    }
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