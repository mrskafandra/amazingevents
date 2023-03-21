



fetch(urlApi).then(response => response.json()).then((data) => {

let queryString = location.search;
console.log(queryString);

let params =new URLSearchParams(queryString);

let id = params.get('id');
console.log(id);

let evento = data.events.find(evento => evento.name == id);
console.log(evento);

document.querySelector('#cardscontainer').innerHTML = `<div class="col-lg-9 pt-5 mx-auto"> <div class="card ">
<img class="card-img-top" src="${evento.image}" alt="${evento.name}">
<div class="card-body text-center">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <div class="btn-card">
        <p class="price card-text"><small>$ ${evento.price}</small></p>
        
    </div>
</div>
</div>
</div>`;


}).catch(error => console.log(error));