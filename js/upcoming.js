import { data } from './data.js';

let htmlEvents = "";
for (let elemento of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(elemento.date);

    if (eventDate > currentDate) {
        console.log("evento pasado")

        htmlEvents += `<div class="col-lg-3 pt-5"> <div class="card">
    <img class="card-img-top" src="${elemento.image}">
    <div class="card-body text-center">
        <h5 class="card-title">${elemento.name}</h5>
        <p class="card-text">${elemento.description}</p>
        <div class="btn-card">
            <p class="price card-text"><small>$ ${elemento.price}</small></p>
            <a href="#" class="btn-ver btn btn-secondary ">ver mas...</a>
        </div>
    </div>
</div>
</div>`;
        console.log(htmlEvents);
    }
}

document.querySelector('div.row').innerHTML += htmlEvents;
