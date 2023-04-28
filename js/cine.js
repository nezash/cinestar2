const getCine = async()=>{

    const id = (new URLSearchParams(window.location.search)).get(`id`);
    const dataCine = await fetch(`http://localhost/cine/cines/${id}`);
    const dataTarifas = await fetch(`http://localhost/cine/cines/${id}/tarifas`);
    const dataPeliculas = await fetch(`http://localhost/cine/cines/${id}/peliculas`);
    var fila = true;
    if (dataCine.status==200) {
        const cine = await dataCine.json();
        const horarios = await dataTarifas.json();
        const peliculas = await dataPeliculas.json();
    let html = `
        <h2>${cine.RazonSocial}</h2>
        
        <div class="cine-info">
            <div class="cine-info datos">
                <p>Direccion: ${cine.Direccion}</p>
                <p>Teléfono: ${cine.Telefonos}</p>
                <br/>
                <div class="tabla">`;
            horarios.forEach(horario=>{
                if (fila = true){
                    html+=`                
                    <div class="fila">
                        <div class="celda-titulo">${horario.DiasSemana}</div>
                        <div class="celda">${horario.Precio}</div>
                    </div> `
                    fila=false;
                }else{
                    html+=`  
                    <div class="fila impar">
                        <div class="celda-titulo">${horario.DiasSemana}</div>
                        <div class="celda">${horario.Precio}
                    </div>`
                    fila=true;
                }})

        html+=`
            </div>
                <div class="aviso">
                    <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente,
                     a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                </div>
            </div>
            <img src="img/cine/${cine.id}.2.jpg"/>
            <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
            <div class="cine-info peliculas">
                <div class="tabla">
                <div class="fila titulo">
                    <div class="celda-cabecera">Películas</div>
                    <div class="celda-cabecera">Horarios</div>
                </div>`;
                
                peliculas.forEach(pelicula=>{
                    if (fila = true){
                        html+=`  
                    <div class="fila">
                        <div class="celda-titulo">${pelicula.Titulo}</div>
                        <div class="celda">${pelicula.Horarios}</div>
                    </div>
                    `
                    fila=false;
                }else{
                    html+=`  
                    <div class="fila impar">
                        <div class="celda-titulo">${pelicula.Titulo}</div>
                        <div class="celda">${pelicula.Horarios}</div>
                    </div>`
                    fila=true;
                }})
        html+=`
                    </div>
                </div>
            </div>
        </div>
                <div>
                <img style="float:left;" src="img/cine/${cine.id}.3.jpg"/>
                <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                    Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
                    <br/><br/>
                    Visitános y diviértete con nosotros. 
                    <br/><br/>
                    <b>CINESTAR</b>, siempre pensando en tí. 
                </span>		
            </div>
        </div>
        </div>
        
        `

    document.getElementById('contenido-interno').innerHTML = html;
    };


}





getCine();
