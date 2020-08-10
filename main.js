const clientID = 'EigRCiVF8VURsycALQfO4ud80VysLkWYbJplf5RcZh0';
const collectionID = '11710653';
const URL = `https://api.unsplash.com/photos/random?collections=${collectionID}&client_id=${clientID}`;

const grabContent = async function() {
    const response = await fetch(URL);
    const data = await response.json();

    return data;
}


let divTag = document.querySelector('div#descriptionText');

grabContent().then(data => {
    divTag.innerHTML = data.alt_description;
    
    
    if (data.id == USERURL) {
        YAY YOU GUSSED IT
    } else {
        NOPE
    }
})