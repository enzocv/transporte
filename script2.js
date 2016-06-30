/**
 * Created by Drei on 6/21/2016.
 */

var tableExistsAlready = false;
var solutionExistsAlready = false;
var processExistsAlready = false;

function crearTablaProceso(procesoSolucion) {
    var body = document.getElementById("mainForm");
    var divProceso = document.createElement('div');
    divProceso.setAttribute('id','divProceso');
    var table = [];
    var tableBody = [];
    var p = [];
    var textnode = [];


    if (!processExistsAlready) {
        /*var br = document.createElement('br');*/
        for (var i=0;i<procesoSolucion.length-1;i++) {
            p.push(document.createElement('p'));
            table.push(document.createElement('table'));
            tableBody.push(document.createElement('tbody'));
            table[i].className='t'+ i;
            textnode.push(document.createTextNode("Iteración N° " + (parseInt(i)+1)));
            procesoSolucion[i].forEach(function(rowData) {
                var row = document.createElement('tr');

                rowData.forEach(function(cellData) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    row.appendChild(cell);
                });

                tableBody[i].appendChild(row);
            });
            p[i].appendChild(textnode[i]);
            p[i].className = 'pProceso';
            table[i].appendChild(tableBody[i]);
            table[i].className+=' tableProceso pure-table pure-table-bordered';
            divProceso.appendChild(p[i]);
            /*p.appendChild(br);*/
            divProceso.appendChild(table[i]);
        }
        body.appendChild(divProceso);
        processExistsAlready =true;

    }
    else{
        var proceso = document.getElementById('divProceso');
        body.removeChild(proceso);

        processExistsAlready = false;
        crearTablaProceso(procesoSolucion);
    }
}

function crearTablaSolucion(tableData) {
    var body = document.getElementById("mainForm");
    var texto = document.createElement('input');
    texto.setAttribute('id','inputSol');
    var divSolucion = document.createElement('div');
    divSolucion.setAttribute('id','divSolucion');
    var table = document.createElement('table');
    table.className='tableSol';
    var tableBody = document.createElement('tbody');

    //text
    var p = document.createElement('p');
    p.className='pure-u-1-3';
    var textNode = document.createTextNode("Solución");
    p.appendChild(textNode);


    if (!solutionExistsAlready) {
        tableData.forEach(function(rowData) {
            var row = document.createElement('tr');

            rowData.forEach(function(cellData) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(cellData));
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

        divSolucion.appendChild(p);

        table.appendChild(tableBody);
        table.className+=' pure-table pure-table-bordered';
        divSolucion.appendChild(table);

        //input stuff
        texto.value='Costo mínimo total = '+total;
        texto.readOnly=true;
        texto.className='inputSol pure-input pure-input-1';
        divSolucion.appendChild(texto);

        body.appendChild(divSolucion);

        solutionExistsAlready =true;
    }
    else{
        var divSol = document.getElementById('divSolucion');
        body.removeChild(divSol);
        solutionExistsAlready = false;
        crearTablaSolucion(tableData);
    }
}

function generarTabla(){
    // get the reference for the body
    var body = document.getElementById("mainForm");

    // creates a <table> element and a <tbody> element
    var tbl     = document.createElement("table");
    tbl.className='pure-table pure-table-bordered pure-u-1';
    tbl.setAttribute('id','tablaGenerada');
    /*var tblBody = document.createElement("tbody");*/

    var Filas = document.getElementById('inputFilas');
    var x = parseInt(Filas.value) + 2 ;
    var Columnas = document.getElementById('inputColumnas');
    var y = parseInt(Columnas.value) + 2 ;
    if(solutionExistsAlready){
        body.removeChild(document.getElementById('divSolucion'));
        solutionExistsAlready = false;
    }

    if(processExistsAlready){
        body.removeChild(document.getElementById('divProceso'));
        processExistsAlready = false;
    }

    if (!tableExistsAlready) {
        // creating all cells
        tableExistsAlready=true;
        for (var i = 0; i < x; i++) {
            // creates a table row
            var row = document.createElement("tr");
            row.className='pure-input-1';
            for (var j = 0; j < y; j++) {
                var cell = document.createElement("td");
                /*cell.className='pure-u-1-24';*/
                var input = document.createElement('input');
                input.className = 'pure-input-1';

                if (i == 0 && j > 0 && j < y-1) {
                    input.readOnly = true;
                    input.value='D'+ parseInt(j);
                }

                if (i == 0 && j == y-1) {
                    input.readOnly = true;
                    input.value='Demanda';
                }

                if (i > 0 && j == 0 && i < x-1) {
                    input.readOnly = true;
                    input.value='O'+ parseInt(i);
                }

                if (i == x-1 && j == 0) {
                    input.readOnly = true;
                    input.value='Oferta';
                }

                if ((i == x - 1 && j == y - 1) || (i == 0 && j == 0)) {
                    input.readOnly = true;
                    input.type = 'hidden';
                }

                cell.appendChild(input);
                row.appendChild(cell);
            }

            tbl.appendChild(row);
        }


        body.appendChild(tbl);


        var btnResolverNWC = document.createElement('input');
        btnResolverNWC.value="NWCM";
        btnResolverNWC.setAttribute('id','btnResolverNWC');
        btnResolverNWC.setAttribute('onClick','saveTable(costos,"NWC")');
        btnResolverNWC.className = 'pure-button pure-button-primary';
        body.appendChild(btnResolverNWC);


        var btnResolverLCM = document.createElement('input');
        btnResolverLCM.value="LCM";
        btnResolverLCM.setAttribute('id','btnResolverLCM');
        btnResolverLCM.setAttribute('onClick','saveTable(costos,"LCM")');
        btnResolverLCM.className = 'pure-button pure-button-primary';
        body.appendChild(btnResolverLCM);

        var btnResolverVAM = document.createElement('input');
        btnResolverVAM.value="VAM";
        btnResolverVAM.setAttribute('id','btnResolverVAM');
        btnResolverVAM.setAttribute('onClick','saveTable(costos,"VAM")');
        btnResolverVAM.className = 'pure-button pure-button-primary';
        body.appendChild(btnResolverVAM);
    }
    else{
        var mainForm = document.getElementById('mainForm');
        var existingTable = document.getElementById('tablaGenerada');
        var existingButtonVAM = document.getElementById('btnResolverVAM');
        var existingButtonLCM = document.getElementById('btnResolverLCM');
        var existingButtonNWC = document.getElementById('btnResolverNWC');
        mainForm.removeChild(existingTable);
        mainForm.removeChild(existingButtonVAM);
        mainForm.removeChild(existingButtonLCM);
        mainForm.removeChild(existingButtonNWC);
        tableExistsAlready = false;
        generarTabla();
    }

}

function saveTable(myTableArray,method) {

    costos.length=0;
    demanda.length=0;
    oferta.length=0;

    var table = document.getElementById('tablaGenerada');
    var Filas = document.getElementById('inputFilas');
    var x = parseInt(Filas.value)+1;
    var Columnas = document.getElementById('inputColumnas');
    var y = parseInt(Columnas.value)+1;
    for (var i=1;i<x ;i++) {
        var arregloFilas = [];
        for (var j=1; j< y ; j++) {
            var td = table.rows[i].cells[j].getElementsByTagName('input')[0];
            var data = parseInt(td.value);
            arregloFilas.push(data);
        }
        myTableArray.push(arregloFilas);
    }

    for (var k=1; k<y ;k++) {
        var td2 = table.rows[x].cells[k].getElementsByTagName('input')[0];
        var dataDemanda = parseInt(td2.value);
        demanda.push(dataDemanda);
    }

    for (var l=1; l<x ;l++) {
        var td3 = table.rows[l].cells[y].getElementsByTagName('input')[0];
        var dataOferta = parseInt(td3.value);
        oferta.push(dataOferta);
    }

    if (method==='LCM') {
        lcm();
    }

    if (method==='VAM') {
        vam();
    }

    if (method==='NWC') {
        nwc();
    }
    crearTablaProceso(procesoSolucion);
    crearTablaSolucion(solucion);

}