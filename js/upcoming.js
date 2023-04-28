

fetch(urlApi).then(response => response.json()).then((data) => {

let htmlEvents = "";
for (let elemento of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(elemento.date);

    if (eventDate > currentDate) {
        console.log("evento pasado")

        htmlEvents += `<div class="col-lg-3 pt-5"> <div class="card h-100">
        <img class="card-img-top" src="${elemento.image}" alt="${elemento.name}" >
    <div class="card-body text-center">
        <h5 class="card-title">${elemento.name}</h5>
        <p class="card-text">${elemento.description}</p>
        <div class="btn-card">
            <p class="price card-text"><small>$ ${elemento.price}</small></p>
            <a href="./details.html?id=${elemento.name}" class="btn-ver btn btn-secondary ">ver mas...</a>
        </div>
    </div>
</div>
</div>`;
        console.log(htmlEvents);
    }
}

document.querySelector('#cardscontainer').innerHTML += htmlEvents;

//categoria de los checkboxes 

let eventos = data.events
let category = [];
let checkCategory = "";

eventos.forEach(evento => {
    if (!category.includes(evento.category)) {
        category.push(evento.category)
        checkCategory += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${evento.category}" />
        <label class="form-check-label" for="inlineCheckbox1">${evento.category}</label>
    </div>`;

    }
});


let inputCheck = document.getElementById('checkbox');
inputCheck.innerHTML = checkCategory;

//Barra de Busqueda

const d = document;

function serchFilters(input, selector) {
    d.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {
            console.log(e.target.value);
            d.querySelectorAll(selector).forEach((el) =>
                el.textContent.toLowerCase().includes(e.target.value) ? el.classList.remove("filter")
                    : el.classList.add("filter")
            )

        }

    });
}
serchFilters(".search", ".card");

}).catch(error => console.log(error));