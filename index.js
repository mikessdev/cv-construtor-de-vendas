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
let newFilteredArray = enterpriseUnits;

function getFiltersParams() {
    const stageParams = document.getElementById('stage-params').textContent;
    const blockParams = document.getElementById('block-params').textContent;
    const statusParams = document.getElementById('status-params').textContent;

    const parameters = {
        stage: stageParams,
        block: blockParams,
        status: statusParams}
    
    const validatedParameter = filterValidation(parameters);

    if(validatedParameter) {
        filter(validatedParameter);    
    }
}

function filterValidation(parameters) {
    const noParams = {
        stage: 'Escolha a etapa',
        block: 'Escolha a quadra',
        status: 'Situação'
    }

    let validatedParameter = {
        stage: '',
        block: '',
        status: ''}

    validatedParameter.stage = parameters.stage === noParams.stage ?  null : parameters.stage;
    validatedParameter.block = parameters.block === noParams.block ? null : parameters.block;
    validatedParameter.status = parameters.status === noParams.status ? null : parameters.status;

    return parameters.stage === noParams.stage && 
    parameters.block === noParams.block && 
    parameters.status === noParams.status ?
    alert('Defina pelo menos um parametro de filtragem') :
    validatedParameter;
};

function filter(parameters) {
    newFilteredArray = [];

    if(parameters.stage && !parameters.block && !parameters.status) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.stage === parameters.stage;
        })
    };

    if(parameters.block && !parameters.stage && !parameters.status) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.block === parameters.block;
        })
    };

    if(parameters.status && !parameters.block && !parameters.stage) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.status === parameters.status;
        })
    };

    if(parameters.stage && parameters.block && !parameters.status) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.stage === parameters.stage && 
                   e.block === parameters.block;
        })
    };

    if(parameters.status && parameters.block && !parameters.stage) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.status === parameters.status && 
                   e.block === parameters.block;
        })
    };

    if(parameters.status && parameters.stage && !parameters.block ) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.status === parameters.status && 
                   e.stage === parameters.stage;
        })
    };

    if(parameters.status && parameters.stage && parameters.block ) {
        newFilteredArray = enterpriseUnits.filter(e => {
            return e.status === parameters.status && 
                   e.stage === parameters.stage && 
                   e.block === parameters.block;
        })
    };

    console.table(newFilteredArray);

    if(newFilteredArray.length > 0) {
        createNewTable(newFilteredArray);
    } else {
        alert('Nenhum item encontrado com esses parametros');
        createNewTable([]);
    };
};

function cleanTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
      }
};

function createNewTable(newTableData) {
    const table = document.getElementById('table-body');
    cleanTable(table);

    newTableData.forEach(element => {
        let tr = document.createElement("tr");

        let tableRow = `
        <td class="row-container , first-row">
            <div class="row-content1 , vertical-dashed-line">
                ${element.block} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content1 , vertical-dashed-line">
                ${element.numberRooms} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content1 , vertical-dashed-line">
                ${element.floor} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content1 , vertical-dashed-line">
                ${element.totalArea} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content1">
            ${element.column} 
            </div>
        </td>
        <td class="row-container , last-row , ${defineStatusClass(element.status)}">
            <div class="row-content1">
            ${element.status} 
            </div>
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
};

// Ordenar Por Maior ou Menor Valor
function hideElement(elementID) {
    return document.getElementById(elementID).style.display = 'none';
}

function showElement(elementID) {
    return document.getElementById(elementID).style.display = 'block';
}

function sortByLowestValue(dropdownContent, button, element) {
    selectItem(dropdownContent, button, element);

    hideElement('sorted-by-lowest');
    showElement('sorted-by-highest');

    const newSortedArray = newFilteredArray.sort((a, b) => {
        return  parseInt(a.price) - parseInt(b.price);
    });
    console.table(newSortedArray);
    createNewTable(newSortedArray);
}

function sortByHighestValue(dropdownContent, button, element) {
    selectItem(dropdownContent, button, element);

    hideElement('sorted-by-highest');
    showElement('sorted-by-lowest');

    const newSortedArray = newFilteredArray.sort((a, b) => {
        return  parseInt(b.price) - parseInt(a.price);
    });
    console.table(newSortedArray);
    createNewTable(newSortedArray);
}

// Criando Tabela ao abrir o site pela primeira vez
createNewTable(enterpriseUnits);
