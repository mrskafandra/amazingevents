










fetch(urlApi).then(response => response.json()).then((data) => {

    //---------------------------------------------------

    let porcentajePasado = []
    let eventosPasados = [];
    let capacity = []
    for (let event of data.events) {
        if (event.date < data.currentDate) {
            eventosPasados.push(event);
            porcentajePasado.push(((event.assistance/event.capacity)*100).toFixed(1));
            capacity.push(event.capacity)
        }
    }


    for(let eventin of eventosPasados) {
        
        porcentajePasado.sort(function(a, b){return b - a});
        
        console.log(porcentajePasado)
        if(porcentajePasado[0] == ((eventin.assistance/eventin.capacity)*100).toFixed(1) )
        document.getElementById("MaxPercentStatic").innerHTML = `<td> ${eventin.name} ${porcentajePasado[0]}%</td>`
    

    }

    for(let eventin of eventosPasados) {
        
        porcentajePasado.sort(function(a, b){return a - b});
        
        console.log(porcentajePasado)
        if(porcentajePasado[0] == ((eventin.assistance/eventin.capacity)*100).toFixed(1) )
        document.getElementById("MinPercentStatic").innerHTML = `<td> ${eventin.name} ${porcentajePasado[0]}%</td>`
    

    }

    for(let eventin of eventosPasados) {

      

        capacity.sort(function(a, b){return b - a});
        console.log(capacity)
        if(capacity[0] == eventin.capacity )
        document.getElementById("largeCapacity").innerHTML = `<td> ${eventin.name} ${capacity[0]}</td>`
    

    }



    /*porcentajePasado.sort(function(a, b){return b - a});
    document.querySelector("thead").innerHTML = `<td>${porcentajePasado} ${eventin.name}</td>`*/
    

    

    let eventosPasadosCategorias = [];

    let eventosPasadosHtml = [];

    
    eventosPasados.forEach(element => {

        
        if (!eventosPasadosCategorias.includes(element.category)) {
            eventosPasadosCategorias.push(element.category);
            let eventosPasadosFiltros = [];
            
            eventosPasadosFiltros = eventosPasados.filter(ev => ev.category == element.category)

            
            eventosPasadosFiltros.reduce((acumulador, valorActual) => {
                asistencia = valorActual.assistance;
                precio = valorActual.price;
                ganancia = asistencia * precio;
                capacidad = valorActual.capacity;
                operaciones = {
                    gananciaFinal: acumulador.gananciaFinal + ganancia,
                    capacidadFinal: acumulador.capacidadFinal + capacidad,
                    totalAsistencia: acumulador.totalAsistencia + asistencia
                }
                return operaciones;
            }, {
                gananciaFinal: 0,
                capacidadFinal: 0,
                totalAsistencia: 0
            })

            porcentajeAsis = (operaciones.totalAsistencia / operaciones.capacidadFinal * 100).toFixed(0);


            eventosPasadosHtml.push(`<tr><td>${element.category}</td><td>$ ${operaciones.gananciaFinal}</td><td>${porcentajeAsis}%</td></tr>`)
        };
        document.getElementById("past").innerHTML = eventosPasadosHtml.join("");
    })





    //--------------------------------------------


    let eventosFuturos = [];
    for (let event of data.events) {
        if (event.date > data.currentDate) {
            eventosFuturos.push(event);
        }
    }





    let eventosFuturosCategoria = [];

    let eventosFuturosHtml = [];


    eventosFuturos.forEach(element => {

        if (!eventosFuturosCategoria.includes(element.category)) {
            eventosFuturosCategoria.push(element.category);
            let eventosFuturosFiltrados = [];

            eventosFuturosFiltrados = eventosFuturos.filter(e => e.category == element.category)

            eventosFuturosFiltrados.reduce((acumulador, valorActual) => {
                 valorAprox = valorActual.estimate;
                 precio = valorActual.price;
                 ganancia = valorAprox * precio;
                 capacidad = valorActual.capacity;
                operaciones = {
                    gananciaFinal: acumulador.gananciaFinal + ganancia,
                    totalCapacidad: acumulador.totalCapacidad + capacidad,
                    totalAsistenciaEstimada: acumulador.totalAsistenciaEstimada + valorAprox
                }
                return operaciones;
            },
                {
                    gananciaFinal: 0,
                    totalCapacidad: 0,
                    totalAsistenciaEstimada: 0
                })

            let porcentajeEst = (operaciones.totalAsistenciaEstimada / operaciones.totalCapacidad * 100).toFixed(0);


            eventosFuturosHtml.push(`<tr><td>${element.category}</td><td>$ ${operaciones.gananciaFinal}</td><td>${porcentajeEst}%</td></tr>`)
        };
        document.getElementById("upcoming").innerHTML = eventosFuturosHtml.join("");
    })










    //------------------------------------------------------------------------------------------------------


    /*
     
    
        console.log(eventosPasados[0].name)
    
        let porcentaje = [];
    
        for (let et of eventosPasados) {
            porcentaje.push(((et.assistance / et.capacity) * 100))
            porcentaje.push(et.name)
    
        
    
        let htmlEvents = "";
        htmlEvents += `<td>${et.name}</td><td>${et.name}</td>`
        document.getElementById("past").innerHTML += htmlEvents;
    }
        /*
            eventosPasados.forEach(evento => {
        
                let htmlEvents = "";
                let porcentaje = ((evento.assistance / evento.capacity) * 100)
                percent.push(porcentaje)
                percent.sort(function(a, b){return b - a});
        
               
                
                if (percent[0] > porcentaje ) {
        
                    htmlEvents += `<tr>
                        <td>${evento.name} ${porcentaje}%</td>
                         
                     </tr>`;
                }
        
                document.querySelector('thead').innerHTML += htmlEvents;
            });



    percent.sort(function (a, b) { return b - a });
    console.log(percent)






    //__________________________________________________

    /* function statCarga(types) {
 
         let tableBodyHTML = "";
 
         types.forEach(type => {
             let filterEvents = eventByType(type, events);
             let maxAttend = getMaxAttend(filterEvents);
             let lowAttend = getLowAttend(filterEvents);
             let maxcapacity = getMaxCapacity(filterEvents);
             tableBodyHTML += `<tr>
         
         <td>${maxAttend}</td>
      
         
     </tr>`;
         });
 
     }
 
     function eventByType(type, events) {
         return events.filter(event => event.type.includes(type));
     }
 
     function getMaxAttend(amazingEvents) {
         let asistencia = 0
         let capacidad = 0
         amazingEvents.forEach(amazingEvent => asistencia += amazingEvent.assistance);
         amazingEvents.forEach(amazingEvent => capacidad += amazingEvent.capacity);
         if (((asistencia / capacidad) * 100) > 80) {
             return true
         } else {
             false
         };
 
     };
 
     getMaxAttend()
 
 */

    //-----------------------------------------------------------------------------------






}).catch(error => console.log(error));