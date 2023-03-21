let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = [];
let types = [];

async function getEventos() {
    try {
        let response = await fetch(urlAPI);
        let dataAPI = await response.json();
        
        for (const evento of dataAPI.results) {
            try {
                let eventoData = await getEventos(evento.url);
                eventoData.types = eventoData.types.map(item => item.type.name);
                eventos.push(eventoData);
            } catch (error) {
                console.log(error.message);
            }
        }
        // ya tengo disponible el array pokemons para hacer todas las operaciones iniciales

        types = extractTypes(eventos);

        loadStats(types);

    } catch (error) {
        console.log(error.message);
    }
}
getEventos();

async function getEventos(url) {
    try {
        let response = await fetch(url);
        let evento = await response.json();
        return evento;
    } catch (error) {
        console.log(error.message);
        return {};
    }
}

function extractTypes(eventos){
    let types = [];
    eventos.forEach(evento => {
        evento.types.forEach(type => {
            if (!types.includes(type)) {
                types.push(type);
            }
        })
    });
    return types;
}

function loadStats(types) {
    let container = document.querySelector("tbody");
    let tableBodyHTML = "";
    types.forEach(type => {
        let filteredEventos = getEventosByType(type, eventos);
        let promedioAltura = getPromedioAltura(filteredEventos);
        let masGrande = getBigger(filteredEventos);
        let masChico = getSmaller(filteredEventos);
        tableBodyHTML += `<tr>
        <td>${type}</td>
        <td>${promedioAltura}</td>
        <td>${masGrande.height} (${masGrande.name})</td>
        <td>${masChico.height} (${masChico.name})</td>
    </tr>`;
    })
    container.innerHTML = tableBodyHTML;
}

function getEventosByType(type, eventos) {
    return eventos.filter(evento => evento.types.includes(type));
}

function getPromedioAltura(eventos) {
    let sumaAlturas = 0;
    eventos.forEach(evento => sumaAlturas += evento.height);
    return Math.round(sumaAlturas / eventos.length);
   

}
console.log(Math.round)

function getBigger(eventos) {
    return eventos.reduce((acumulador, valorActual) => {
        if (valorActual.height > acumulador.height) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
}

function getSmaller(eventos) {
    return eventos.reduce((acumulador, valorActual) => {
        if (valorActual.height < acumulador.height) {
            return valorActual;
        } else {
            return acumulador;
        }
    });
}