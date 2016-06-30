/**
 * Created by Drei on 6/19/2016.
 */

var oferta = [];
var demanda = [];
var costos = [];
var solucion=[];
var procesoSolucion = [];

function crearSolucion() {
    var solucion = [];
    for (var i=0;i<oferta.length;i++) {
        solucion.push([]);
        for (var j=0;j<demanda.length;j++) {
            solucion[i].push(0);
        }
    }
    return solucion;
}

function compararOyD(){
    var numO = oferta.length;
    var numD = demanda.length;
    var sumO = oferta.reduce(function(a, b) { return a + b; }, 0);
    var sumD = demanda.reduce(function(a, b) { return a + b; }, 0);
    if(sumO > sumD) {
        for (var i = 0 ; i < numO ; i++) {
            costos[i][numD] = 0;
        }
            demanda.push(sumO-sumD);
    }
    if(sumO < sumD) {
        costos.push([null,null]);
        for (var j = 0 ; j < numD ; j++) {
            costos[numO][j] = 0;
        }
            oferta.push(sumD-sumO);
    }
}


function hallarPenalidadFilas(copia){
    var finFila;
    var penFila=[];
    var copiaCostos=ClonarArreglo(copia);
    var nulo;
    for (var j=0; j < copiaCostos.length; j++) {
        do {
            finFila = false;
            nulo=0;
            for (var k=0; k < copiaCostos[j].length; k++) {
                if (isNaN(copiaCostos[j][k])) {
                    nulo++;
                }
            }
            var nulo2=0;
            for (var l = copiaCostos[j].length-nulo ; l < copiaCostos[j].length; l++) {
                if (copiaCostos[j][l]=='-') {
                    nulo2++;
                }
            }
            if(nulo==copiaCostos[j].length){
                finFila=false;
            }
            else {
                if (nulo == nulo2 && nulo!=0) {
                    for (var m = 0; m < copiaCostos[j].length - 1 - nulo; m++) {
                        if (isNaN(copiaCostos[j][m])) {
                            var temp3 = copiaCostos[j][m];
                            copiaCostos[j][m] = copiaCostos[j][m + 1];
                            copiaCostos[j][m + 1] = temp3;
                            finFila = true;
                        } else if ((copiaCostos[j][m] > copiaCostos[j][m + 1]) && !isNaN(copiaCostos[j][m + 1])) {
                            var temp4 = copiaCostos[j][m];
                            copiaCostos[j][m] = copiaCostos[j][m + 1];
                            copiaCostos[j][m + 1] = temp4;
                            finFila = true;
                        }
                    }
                }
                else {
                    for (var i = 0; i < copiaCostos[j].length - 1; i++) {
                        if (isNaN(copiaCostos[j][i])) {
                            var temp = copiaCostos[j][i];
                            copiaCostos[j][i] = copiaCostos[j][i + 1];
                            copiaCostos[j][i + 1] = temp;
                            finFila = true;
                        } else if ((copiaCostos[j][i] > copiaCostos[j][i + 1]) && !isNaN(copiaCostos[j][i + 1])) {
                            var temp2 = copiaCostos[j][i];
                            copiaCostos[j][i] = copiaCostos[j][i + 1];
                            copiaCostos[j][i + 1] = temp2;
                            finFila = true;
                        }
                    }
                }
            }
        }
        while (finFila);
        if (isNaN(copiaCostos[j][1])) {
            penFila.push(copiaCostos[j][0]);
        }
        else{
            penFila.push(copiaCostos[j][1]-copiaCostos[j][0]);
        }
    }
    return penFila
}


function hallarPenalidadColumnas(copia){
    var finColumna;
    var penColumna=[];
    var copiaCostos=ClonarArreglo(copia);
    var nulo;
    for (var j=0; j < copiaCostos[0].length; j++) {
        do {
            finColumna = false;
            nulo=0;
            for (var k=0; k < oferta.length; k++) {
                if (isNaN(copiaCostos[k][j])) {
                    nulo++;
                }
            }
            var nulo2=0;
            for (var l = oferta.length-nulo ; l < oferta.length; l++) {
                if (copiaCostos[l][j]=='-') {
                    nulo2++;
                }
            }
            if(nulo==oferta.length){
                finColumna=false;
            }
            else{
                if(nulo2==nulo && nulo!=0){
                    for (var m = 0; m < copiaCostos.length-1-nulo; m++) {
                        if (isNaN(copiaCostos[m][j])) {
                            var temp4 = copiaCostos[m][j];
                            copiaCostos[m][j] = copiaCostos[m+1][j];
                            copiaCostos[m+1][j] = temp4;
                            finColumna = true;
                        }
                        else if(copiaCostos[m][j] > copiaCostos[m+1][j] && !isNaN(copiaCostos[m+1][j])){
                            var temp3 = copiaCostos[m][j];
                            copiaCostos[m][j] = copiaCostos[m+1][j];
                            copiaCostos[m+1][j] = temp3;
                            finColumna = true;
                        }
                    }
                }
                else {
                    for (var i = 0; i < copiaCostos.length - 1; i++) {
                        if (isNaN(copiaCostos[i][j])) {
                            var temp = copiaCostos[i][j];
                            copiaCostos[i][j] = copiaCostos[i + 1][j];
                            copiaCostos[i + 1][j] = temp;
                            finColumna = true;
                        }
                        else if (copiaCostos[i][j] > copiaCostos[i + 1][j] && !isNaN(copiaCostos[i + 1][j])) {
                            var temp2 = copiaCostos[i][j];
                            copiaCostos[i][j] = copiaCostos[i + 1][j];
                            copiaCostos[i + 1][j] = temp2;
                            finColumna = true;
                        }
                    }
                }
            }
        }
        while (finColumna);
        if (isNaN(copiaCostos[1][j])) {
            penColumna.push(copiaCostos[0][j]);
        }
        else {
            penColumna.push(copiaCostos[1][j] - copiaCostos[0][j]);
        }
    }
    return penColumna
}

function ClonarArreglo(arr ) {

    var i, copiar;

    if( Array.isArray( arr ) ) {
        copiar = arr.slice( 0 );
        for(i = 0; i < copiar.length; i++ ) {
            copiar[ i ] = ClonarArreglo( copiar[ i ] );
        }
        return copiar;
    } else if( typeof arr === 'object' ) {
        throw 'No se puede copiar un arreglo que contenga objetos :| :/ :(';
    } else {
        return arr;
    }

}

function hallarposiciony(x,copiaCostos) {
    var posicionx=x;
    var posiciony;
    var min;
    for (var j=0;j<demanda.length;j++){
        if(!isNaN(copiaCostos[posicionx][j])){
            min=copiaCostos[posicionx][j];
            break;
        }
    }
    for (var i=0;i<demanda.length;i++) {
        if(!isNaN(copiaCostos[posicionx][i])){
            if (copiaCostos[posicionx][i] <= min ) {
                min=copiaCostos[posicionx][i];
                posiciony=i;
            }
        }
    }
    return posiciony;
}

function hallarposicionx(y,copiaCostos) {
    var posiciony=y;
    var posicionx;
    var min;
    for (var j=0;j<oferta.length;j++) {
        if(!isNaN(copiaCostos[j][posiciony])) {
            min = copiaCostos[j][posiciony];
            break;
        }
    }
    for (var i=0;i<oferta.length;i++) {
        if(!isNaN(copiaCostos[i][posiciony])){
            if (copiaCostos[i][posiciony]<= min) {
                min=copiaCostos[i][posiciony];
                posicionx=i;
            }
        }
    }
    return posicionx;
}
function HallarPosiciones(min,x,y,copiaCostos) {
    var posicionx;
    var posiciony;
    var posiciones=[];

    for (var i=0;i<x.length;i++) {
        if (x[i]===min) {
            posicionx=i;
            posiciony = hallarposiciony(posicionx,copiaCostos);
            break;
        }
    }

    if (posicionx === undefined) {
        for (var j=0;j<y.length;j++) {
            if (y[j]===min) {
                posiciony=j;
                posicionx = hallarposicionx(posiciony,copiaCostos);
                break;
            }
        }
    }
    posiciones.push(posicionx);
    posiciones.push(posiciony);
    return posiciones;
}

function filtro(value) {
    return value !== "-";
}

function ftotal(costos, solucion, x, y) {
    var sum=0;
    for (var i = 0 ; i < y ; i++) {
        for (var j = 0 ; j < x ; j++) {
            sum += parseInt(costos[i][j])* parseInt(solucion[i][j]);
        }
    }
    return sum;
}
function vam(){
    compararOyD();
    solucion= crearSolucion();
    procesoSolucion=[];

    var copiaCostos = ClonarArreglo(costos);
    var copiaDemanda = ClonarArreglo(demanda);
    var copiaOferta = ClonarArreglo(oferta);
    var sumOyD= copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
    do{
        var y = hallarPenalidadColumnas(copiaCostos);
        var x = hallarPenalidadFilas(copiaCostos);
        var z = (x.concat(y)).filter(filtro);
        var max = Math.max.apply(Math, z);
        var posiciones = HallarPosiciones(max,x,y,copiaCostos);

        if (copiaOferta[posiciones[0]]>copiaDemanda[posiciones[1]]) {
            solucion[posiciones[0]][posiciones[1]] = copiaDemanda[posiciones[1]];
            copiaOferta[posiciones[0]]-=copiaDemanda[posiciones[1]];
            copiaDemanda[posiciones[1]]=0;
            for (var i=0;i<copiaOferta.length;i++) {
                copiaCostos[i][posiciones[1]] = "-";
            }
        }
        else if (copiaOferta[posiciones[0]]<copiaDemanda[posiciones[1]]){
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]]-=copiaOferta[posiciones[0]];
            copiaOferta[posiciones[0]]=0;
            for (var j=0; j<copiaDemanda.length; j++) {
                copiaCostos[posiciones[0]][j] = "-";
            }
        }
        else{
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]] = 0;
            copiaOferta[posiciones[0]] = 0;
            for (var k=0; k<copiaDemanda.length; k++) {
                copiaCostos[posiciones[0]][k] = "-";
            }
            for (var l=0;l<copiaOferta.length;l++) {
                copiaCostos[l][posiciones[1]] = "-";
            }
        }
        procesoSolucion.push(ClonarArreglo(solucion));
        sumOyD= copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
    }
    while (sumOyD>0);
    window.total = ftotal(costos,solucion,(copiaDemanda.length),(copiaOferta.length));
}

function hallarCM(copiaCostos) {
    var min;
    for (var m=0;m<oferta.length;m++) {
        for (var n=0;n<demanda.length;n++) {
            if (!isNaN(copiaCostos[m][n])) {
                min = copiaCostos[m][n];
            }
        }
    }
    for (var i=0;i<oferta.length;i++) {
        for (var j=0;j<demanda.length;j++) {
            if (copiaCostos[i][j]<min && !isNaN(copiaCostos[i][j])) {
                min = copiaCostos[i][j];
            }
        }
    }
    return min;
}

function hallarPosicionesCM(costoMinimo,copiaCostos) {
    var posiciones = [];
    /*for (var i=oferta.length-1;i>=0;i--) {
        for (var j=demanda.length-1;j>=0;j--) {
            if (copiaCostos[i][j]==costoMinimo) {
                posiciones[0] = i;
                posiciones[1] = j;
                break;
            }
        }
    }*/
    for (var i=0;i<oferta.length;i++) {
        for (var j=0;j<demanda.length;j++) {
            if (copiaCostos[i][j]==costoMinimo && posiciones[0]==undefined) {
                posiciones[0] = i;
                posiciones[1] = j;
                break;
            }
        }
    }
    return posiciones
}

function lcm(){
    compararOyD();
    solucion= crearSolucion();
    procesoSolucion=[];
    var copiaCostos = ClonarArreglo(costos);
    var copiaDemanda = ClonarArreglo(demanda);
    var copiaOferta = ClonarArreglo(oferta);
    var sumOyD = copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
    do {
        var costoMinimo = hallarCM(copiaCostos);
        var posiciones = hallarPosicionesCM(costoMinimo,copiaCostos);
        
        if (copiaOferta[posiciones[0]]>copiaDemanda[posiciones[1]]) {
            solucion[posiciones[0]][posiciones[1]] = copiaDemanda[posiciones[1]];
            copiaOferta[posiciones[0]]-=copiaDemanda[posiciones[1]];
            copiaDemanda[posiciones[1]]=0;
            for (var i=0;i<copiaOferta.length;i++) {
                copiaCostos[i][posiciones[1]] = "-";
            }
        }
        else if (copiaOferta[posiciones[0]]<copiaDemanda[posiciones[1]]){
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]]-=copiaOferta[posiciones[0]];
            copiaOferta[posiciones[0]]=0;
            for (var j=0; j<copiaDemanda.length; j++) {
                copiaCostos[posiciones[0]][j] = "-";
            }
        }
        else{
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]] = 0;
            copiaOferta[posiciones[0]] = 0;
            for (var k=0; k<copiaDemanda.length; k++) {
                copiaCostos[posiciones[0]][k] = "-";
            }
            for (var l=0;l<copiaOferta.length;l++) {
                copiaCostos[l][posiciones[1]] = "-";
            }
        }
        procesoSolucion.push(ClonarArreglo(solucion));
        sumOyD= copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
    }
    while(sumOyD>0);
    window.total = ftotal(costos,solucion,(copiaDemanda.length),(copiaOferta.length));
}

function hallarPosicionesNWC(copiaCostos) {
    var posiciones = [];

    for (var i=0;i<oferta.length;i++) {
        for (var j=0;j<demanda.length;j++) {
            if (!isNaN(copiaCostos[i][j])) {
                posiciones.push(i);
                posiciones.push(j);
            }
        }
    }

    return posiciones;
}

function nwc(){
    compararOyD();
    solucion= crearSolucion();
    procesoSolucion=[];
    var copiaCostos = ClonarArreglo(costos);
    var copiaDemanda = ClonarArreglo(demanda);
    var copiaOferta = ClonarArreglo(oferta);
    var sumOyD = copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
    do{
        var posiciones = hallarPosicionesNWC(copiaCostos);

        if (copiaOferta[posiciones[0]]>copiaDemanda[posiciones[1]]) {
            solucion[posiciones[0]][posiciones[1]] = copiaDemanda[posiciones[1]];
            copiaOferta[posiciones[0]]-=copiaDemanda[posiciones[1]];
            copiaDemanda[posiciones[1]]=0;
            for (var i=0;i<copiaOferta.length;i++) {
                copiaCostos[i][posiciones[1]] = "-";
            }
        }
        else if (copiaOferta[posiciones[0]]<copiaDemanda[posiciones[1]]){
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]]-=copiaOferta[posiciones[0]];
            copiaOferta[posiciones[0]]=0;
            for (var j=0; j<copiaDemanda.length; j++) {
                copiaCostos[posiciones[0]][j] = "-";
            }
        }
        else{
            solucion[posiciones[0]][posiciones[1]] = copiaOferta[posiciones[0]];
            copiaDemanda[posiciones[1]] = 0;
            copiaOferta[posiciones[0]] = 0;
            for (var k=0; k<copiaDemanda.length; k++) {
                copiaCostos[posiciones[0]][k] = "-";
            }
            for (var l=0;l<copiaOferta.length;l++) {
                copiaCostos[l][posiciones[1]] = "-";
            }
        }
        sumOyD= copiaOferta.reduce(function(a, b) { return a + b; }, 0) + copiaDemanda.reduce(function(a, b) { return a + b; }, 0);
        procesoSolucion.push(ClonarArreglo(solucion));
    }
    while(sumOyD>0);
    window.total = ftotal(costos,solucion,(copiaDemanda.length),(copiaOferta.length));
}
