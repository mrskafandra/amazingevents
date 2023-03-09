
// cards


let htmlEvents = "";
for (let elemento of data.events) {
    

    

        htmlEvents += `<div class="col-lg-3 pt-5" > <div class="card h-100" >
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


//intento de filtrado checkbox 47

cargaCategoria(data.events);
let chequeado = [];
function cargaCategoria(eventos) {
    let che = document.querySelectorAll('input[type="checkbox"]')
    che.forEach(check => {
        check.addEventListener('change', () => {
            if (check.checked) {
              
                document.querySelector('#cardscontainer').innerHTML = " ";
                chequeado.push(check.value) //meto los que estan siendo chequeados
                
                let eventosChequeados = eventos.filter(evento => chequeado.includes(evento.category));
                cargaCard(eventosChequeados);
                eventosChequeados.forEach(evento => {
                    document.querySelector('#cardscontainer').innerHTML += `<div class="col-lg-3 pt-5"> <div class="card h-100">
                    <img class="card-img-top" src="${evento.image}">
                <div class="card-body text-center">
                    <h5 class="card-title ${evento.category}">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="btn-card">
                        <p class="price card-text"><small>$ ${evento.price}</small></p>
                        <a href="./details.html?id=${evento.name}" class="btn-ver btn btn-secondary ">ver mas...</a>
                    </div>
                </div>
            </div>
            </div>`})
            } else {
                console.log("deseleccionado");
                chequeado = chequeado.filter(categoria => categoria != check.value)
                if (chequeado.length == 0 ) {
                    document.querySelector('#cardscontainer').innerHTML = " ";
                    console.log(eventos);
                    let mostrarEventos = eventos;
                    mostrarEventos.forEach(evento => {
                        document.querySelector('#cardscontainer').innerHTML += `<div class="col-lg-3 pt-5"> <div class="card h-100">
                        <img class="card-img-top" src="${evento.image}">
                    <div class="card-body text-center">
                        <h5 class="card-title ${evento.category}">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                        <div class="btn-card">
                            <p class="price card-text"><small>$ ${evento.price}</small></p>
                            <a href="./details.html?id=${evento.name}" class="btn-ver btn btn-secondary ">ver mas...</a>
                        </div>
                    </div>
                </div>
                </div>` })
                }

                else {
                    console.log(chequeado);
                    document.querySelector('#cardscontainer').innerHTML = "";
                    let eventosChequeados = eventos.filter(evento => chequeado.includes(evento.category));
                    cargaCard(eventosChequeados);
                    prueba.forEach(evento => {
                        document.querySelector('#cardscontainer').innerHTML += `<div class="col-lg-3 pt-5"> <div class="card">
                
                <div class="card-body text-center">
                    <h5 class="card-title ${evento.category}">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="btn-card">
                        <p class="price card-text"><small>$ ${evento.price}</small></p>
                        <a href="#" class="btn-ver btn btn-secondary ">ver mas...</a>
                    </div>
                </div>
            </div>
            </div>`})

                }
            }

        })

    })
}



function cargaCard(eventos) {
    for (let event of eventos) {



        htmlEvents += card(event);
    }
}

function card(event) {
    return `<div class="col-lg-3 pt-5"> <div class="card">
    <img class="card-img-top" src="${event.image}">
    <div class="card-body text-center">
        <h5 class="card-title ${event.category}">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="btn-card">
            <p class="price card-text"><small>$ ${event.price}</small></p>
            <a href="" class="btn-ver btn btn-secondary ">ver mas...</a>
        </div>
    </div>
</div>
</div>`;
}












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





