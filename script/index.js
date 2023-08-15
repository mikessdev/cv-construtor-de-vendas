let newFilteredArray = enterpriseUnits;

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

//Unidades Disponível
availableUnits = enterpriseUnits.filter(e => e.status === status.available).length;
updateViewText('available-units', availableUnits, 'Unidade Disponível');




//Status de venda
soldUnits = enterpriseUnits.filter(e => e.status === status.sold).length;

percentSales = ((soldUnits * 100) / enterpriseUnits.length).toFixed(2);

updateViewText('percentage', percentSales, '%');

const barIndicator = document.getElementById('bar-indicator');

barIndicator.style.width = `${percentSales}%`; 




//Situação do Empreendiemnto
updateViewText('enterprise-available', availableUnits);
updateViewText('enterprise-sold', soldUnits);

blockedUnits = enterpriseUnits.filter(e => e.status === status.blocked).length;
updateViewText('enterprise-blocked', blockedUnits);

reservedUnits = enterpriseUnits.filter(e => e.status === status.reserved).length;
updateViewText('enterprise-reserved', reservedUnits);




// Criando Tabela ao abrir o site pela primeira vez
createTable(enterpriseUnits);




//Botão Dropdown
function clickDropdown(dropDown, dropdownContent) {
    toggleDropdown(dropdownContent);
    catchClickOutside(dropDown, dropdownContent);
};

function toggleDropdown(dropdownContent) {
    const dropdown = document.getElementById(dropdownContent);
    dropdown.style.display = dropdown.style.display ===  "block" ?  "none" : "block";
};

function catchClickOutside(dropDown, dropdownContent) {
    document.addEventListener("click", (event) =>  {
        event.preventDefault();

        const dropDownContainer = document.getElementById(dropDown);
        const dropdownContentContainer = document.getElementById(dropdownContent);
        const clickedOut = !dropDownContainer.contains(event.target);
        const dropDownIsOpen = dropdownContentContainer.style.display === "block";

        if (clickedOut && dropDownIsOpen) {
            toggleDropdown(dropdownContent);
        };
    });
};

function updateViewText(elementID, textcontent, auxText=''){
    return document.getElementById(elementID).textContent = `${textcontent} ${auxText}`
};




//Filtrar Disponibilidade
function getFiltersParams() {
    const stageParams = document.getElementById('stage-params').textContent.replace(/\n/g, "").trim();
    const blockParams = document.getElementById('block-params').textContent.replace(/\n/g, "").trim();
    const statusParams = document.getElementById('status-params').textContent.replace(/\n/g, "").trim();

    const params = {
        stage: stageParams,
        block: blockParams,
        status: statusParams
    };

    const validatedParameter = validator(params);

    if(validatedParameter) {
        filter(validatedParameter);    
    };
};

function validator(params) {
    const {stage, block, status } = params;
    const noParams = {
        stage: 'Escolha a etapa',
        block: 'Escolha a quadra',
        status: 'Situação'
    };

    let validatedParams = {
        stage: '',
        block: '',
        status: ''
    };

    validatedParams.stage = stage === noParams.stage ? null : stage;
    validatedParams.block = block === noParams.block ? null : block;
    validatedParams.status = status === noParams.status ? null : status;

    return stage === noParams.stage && 
           block === noParams.block && 
           status === noParams.status ?
           alert('Defina pelo menos um parâmetro de filtragem') :
           validatedParams;
};

function filter(params) {
    const {stage, block, status} = params;
    newFilteredArray = [];

    newFilteredArray = enterpriseUnits.filter(e => {
        if (
            (!stage || e.stage === stage) &&
            (!block || e.block === block) &&
            (!status || e.status === status)
        ) {
            return true;
        }
        return false;
    });

    const noItemsFound = newFilteredArray.length < 1;

    if(!noItemsFound) {
       return createTable(newFilteredArray);
    } else {
        alert('Nenhum item encontrado com esses parâmetros');
        return createTable([]);
    };
};

function cleanTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
      };
};

function createTable(newTableData) {
    const table = document.getElementById('table-body');
    cleanTable(table);

    newTableData.forEach(element => {
        let tr = document.createElement("tr");
        let tableRow = `
        <td class="row-container , first-row">
            <div class="row-content , text-variant-07 , black-color , vertical-dashed-line">
                ${element.block} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content , text-variant-07 , black-color , vertical-dashed-line">
                ${element.numberRooms} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content , text-variant-07 , black-color , vertical-dashed-line">
                ${element.floor} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content , text-variant-07 , black-color , vertical-dashed-line">
                ${element.totalArea} 
            </div>
        </td>
        <td class="row-container">
            <div class="row-content, text-variant-07 , black-color">
            ${element.column} 
            </div>
        </td>
        <td class="row-container , last-row , ${setStatus(element.status)}">
            <div class="row-content , text-variant-07 , white-color">
            ${element.status} 
            </div>
        </td>`;
    
        table.appendChild(tr);
        tr.innerHTML = tableRow;
    });
};

function setStatus(elementStatus) {
    const {available,  blocked, sold, reserved} = status;

    const statusHtml = {
        available: 'status-available',
        reserved: 'status-reserved',
        sold: 'status-sold',
        blocked: 'status-blocked'
    };

    if(elementStatus === available) return statusHtml.available;
    if(elementStatus === reserved) return statusHtml.reserved;
    if(elementStatus === sold) return statusHtml.sold;
    if(elementStatus === blocked) return statusHtml.blocked;
};

function changeElementText(dropdownContent, button, element) {
    toggleDropdown(dropdownContent);
    const ButtonText = document.getElementById(button);
    return ButtonText.textContent = element.textContent;
};




// Ordenar Por Maior ou Menor Valor
function hideElement(elementID) {
    return document.getElementById(elementID).style.display = 'none';
};

function showElement(elementID) {
    return document.getElementById(elementID).style.display = 'block';
};

function sortByLowestValue(dropdownContent, button, element) {
    changeElementText(dropdownContent, button, element);

    hideElement('sorted-by-lowest');
    showElement('sorted-by-highest');

    const newSortedArray = newFilteredArray.sort((a, b) => {
        return  parseInt(a.totalArea.replace('m2', '')) - parseInt(b.totalArea.replace('m2', ''));
    });
    createTable(newSortedArray);
};

function sortByHighestValue(dropdownContent, button, element) {
    changeElementText(dropdownContent, button, element);

    hideElement('sorted-by-highest');
    showElement('sorted-by-lowest');

    const newSortedArray = newFilteredArray.sort((a, b) => {
        return  parseInt(b.totalArea.replace('m2', '')) - parseInt(a.totalArea.replace('m2', ''));
    });
    createTable(newSortedArray);
};
