//TODO: checar de onde vem a informação de status de venda.

//Unidades Disponível
let availableUnits;
let blockedUnits;
let soldUnits;
let reservedUnits;
let percentSales;

const status = {
    available: 'Disponível',
    blocked: 'Bloqueada',
    sold: 'Vendida',
    reserved: 'Reservada'
};

function updateText(elementID, textcontent, auxText=''){
    return document.getElementById(elementID).textContent = `${textcontent} ${auxText}`
};

availableUnits = enterpriseUnits.filter(e => e.status === status.available).length;

updateText('available-units', availableUnits, 'Unidade Disponível');


//Status de venda

soldUnits = enterpriseUnits.filter(e => e.status === status.sold).length;

percentSales = ((soldUnits * 100) / enterpriseUnits.length).toFixed(2);

updateText('percentage', percentSales, '%');

const barIndicator = document.getElementById('bar-indicator');

barIndicator.style.width = `${percentSales}%`; 

//Situação do Empreendiemnto

updateText('enterprise-available', availableUnits);
updateText('enterprise-sold', soldUnits);

blockedUnits = enterpriseUnits.filter(e => e.status === status.blocked).length;

updateText('enterprise-blocked', blockedUnits);

reservedUnits = enterpriseUnits.filter(e => e.status === status.reserved).length;

updateText('enterprise-reserved', reservedUnits);

//Filtrar Disponibilidade

function getFiltersParams() {
    const noParams = {
        stage: 'Escolha a etapa',
        block: 'Escolha a quadra',
        status: 'Situação'
    }

    const stageParams = document.getElementById('stage-params').textContent;
    const blockParams = document.getElementById('block-params').textContent;
    const statusParams = document.getElementById('status-params').textContent;

    const parameters = {
        stage: stageParams,
        block: blockParams,
        status: statusParams}
     
    parameters.stage === noParams.stage ||
    parameters.block === noParams.block ||
    parameters.status === noParams.status ? 
    alert('Defina os Parametros de Filtragem') :
    filter(parameters);
}

function filter(parameters) {
    const newSortedArray = enterpriseUnits.filter(e => {
        return e.stage === parameters.stage && 
        e.block === parameters.block && 
        e.status === parameters.status;
    })

    newSortedArray.length > 0 ? 
    createNewTable(newSortedArray) : 
    alert('Nenhum item encontrados com esses parametros');
};

function cleanTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
      }
};

function createNewTable(newSortedArray) {
    const table = document.getElementById('table-body');
    cleanTable(table);

    newSortedArray.forEach(element => {
        let tr = document.createElement("tr");

        let tableRow = `
        <td class="row-content , first-row , vertical-dashed-line">
            ${element.block} 
        </td>
        <td class="row-content , vertical-dashed-line">
            ${element.numberRooms} 
        </td>
        <td class="row-content , vertical-dashed-line">
            ${element.floor} 
        </td>
        <td class="row-content , vertical-dashed-line">
            ${element.totalArea} 
        </td>
        <td class="row-content">
            ${element.column} 
        </td>
        <td class="row-content , last-row , ${defineStatusClass(element.status)}">
            ${element.status} 
        </td>`;
    
        table.appendChild(tr);
        tr.innerHTML = tableRow;
    });
};

function defineStatusClass(elementStatus) {
    const available = 'status-available';
    const reserved = 'status-reserved';
    const sold = 'status-sold';
    const blocked = 'status-blocked';

    if(elementStatus === status.available) return available;
    if(elementStatus === status.reserved) return reserved;
    if(elementStatus === status.sold) return sold;
    if(elementStatus === status.blocked) return blocked;
}

// Ordenar Por Maior ou Menor Valor
function hideElement(elementID) {
    return document.getElementById(elementID).style.display = 'none';
}

function showElement(elementID) {
    return document.getElementById(elementID).style.display = 'block';
}

function sortByLowestValue(a, b) {
    hideElement('sorted-by-lowest');
    showElement('sorted-by-highest');

    return  parseInt(b.price) - parseInt(a.price);
}

function sortByHighestValue(a, b) {
    hideElement('sorted-by-highest');
    showElement('sorted-by-lowest');

    return  parseInt(a.price) - parseInt(b.price);
}

function sortTable(sortedMethod, dropdownContent, button, element){
    const table = document.getElementById('table-body');


    selectItem(dropdownContent, button, element);

    const newSortedArray = enterpriseUnits.sort(sortedMethod);

    while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

    for (let element of newSortedArray) {
        let tr = document.createElement("tr");
        let tableRow = `
        <td class="row-content , first-row , vertical-dashed-line">${element.block} </td>
        <td class="row-content , vertical-dashed-line">${element.numberRooms} </td>
        <td class="row-content , vertical-dashed-line">${element.floor} </td>
        <td class="row-content , vertical-dashed-line">${element.totalArea} </td>
        <td class="row-content">${element.column} </td>
        <td class="row-content , last-row , ${defineStatusClass(element.status)}">${element.status} </td>`;
    
        table.appendChild(tr);
        tr.innerHTML = tableRow;
    }
}

// Criando Tabela ao abrir o site
createNewTable(enterpriseUnits);
