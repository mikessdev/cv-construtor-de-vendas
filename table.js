let enterpriseUnits = [
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '3',
        totalArea: '32,99 m2',
        column: '15',
        status: 'Disponível',
        price: '300.000,00'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '3',
        totalArea: '32,99 m2',
        column: '12',
        status: 'Disponível',
        price: '350.000,00'
    },
    {
        block: 'Noronha',
        numberRooms: '2',
        floor: '5',
        totalArea: '54,58 m2',
        column: '14',
        status: 'Reservada',
        price: '210.000,00'
    },
    {
        block: 'Maragogi',
        numberRooms: '2',
        floor: '5',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Vendida',
        price: '280.000,00'
    },
    {
        block: 'Arraial do cabo',
        numberRooms: '2',
        floor: '6',
        totalArea: '54,58 m2',
        column: '13',
        status: 'Disponível',
        price: '270.000,00'
    },
    {
        block: 'Carneiros',
        numberRooms: '2',
        floor: '2',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Vendida',
        price: '310.000,00'
    },
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '7',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Reservada',
        price: '343.000,00'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '8',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Vendida',
        price: '180.000,00'
    },
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '7',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Reservada',
        price: '313.000,00'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '8',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Reservada',
        price: '298.000,00'
    },
];

const table = document.getElementById('table-body');


function defineClass(status) {
    const available = 'status-available';
    const reserved = 'status-reserved';
    const sold = 'status-sold';

    if(status === 'Disponível') return available;
    if(status === 'Reservada') return reserved;
    if(status === 'Vendida') return sold;
}


for (let element of enterpriseUnits) {
    let tr = document.createElement("tr");
    let tableRow = `
    <td class="row-content , first-row , vertical-dashed-line">${element.block} </td>
    <td class="row-content , vertical-dashed-line">${element.numberRooms} </td>
    <td class="row-content , vertical-dashed-line">${element.floor} </td>
    <td class="row-content , vertical-dashed-line">${element.totalArea} </td>
    <td class="row-content">${element.column} </td>
    <td class="row-content , last-row , ${defineClass(element.status)}">${element.status} </td>`;

    table.appendChild(tr);
    tr.innerHTML = tableRow;
}


function sortByLowestPrice(a, b) {
    return  parseInt(b.price) - parseInt(a.price);
}

function sortByHighestPrice(a, b) {
    return  parseInt(a.price) - parseInt(b.price);
}

function sortByBlock(a, b) {
    const blockA = a.block.toLowerCase();
    const blockB = b.block.toLowerCase();
  
    if (blockA < blockB) {
      return -1;
    }
    if (blockA > blockB) {
      return 1;
    }
    
    return enterpriseUnits.indexOf(a) - enterpriseUnits.indexOf(b);
}

function sortByStatus(a, b) {
    const blockA = a.status.toLowerCase();
    const blockB = b.status.toLowerCase();
  
    if (blockA < blockB) {
      return -1;
    }
    if (blockA > blockB) {
      return 1;
    }
    
    return enterpriseUnits.indexOf(a) - enterpriseUnits.indexOf(b);
}

function sortByRooms(a, b) {
    return  parseInt(b.numberRooms) - parseInt(a.numberRooms);
}

function sortByFloor(a, b) {
    return  parseInt(b.floor) - parseInt(a.floor);
}

function sortByTotalArea(a, b) {
    const areaA = a.totalArea.replace('m2', "");
    const areaB = b.totalArea.replace('m2', "");

    return  parseInt(areaB) - parseInt(areaA);
}


function sortTable(sortedMethod, dropdownContent, button, element){

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
        <td class="row-content , last-row , ${defineClass(element.status)}">${element.status} </td>`;
    
        table.appendChild(tr);
        tr.innerHTML = tableRow;
    }
}