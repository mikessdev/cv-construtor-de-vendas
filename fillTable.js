const enterpriseUnits = [
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '3',
        totalArea: '32,99 m2',
        column: '15',
        status: 'Disponível'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '3',
        totalArea: '32,99 m2',
        column: '12',
        status: 'Disponível'
    },
    {
        block: 'Noronha',
        numberRooms: '2',
        floor: '5',
        totalArea: '54,58 m2',
        column: '14',
        status: 'Reservada'
    },
    {
        block: 'Maragogi',
        numberRooms: '2',
        floor: '5',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Vendida'
    },
    {
        block: 'Arraial do cabo',
        numberRooms: '2',
        floor: '6',
        totalArea: '54,58 m2',
        column: '13',
        status: 'Disponível'
    },
    {
        block: 'Carneiros',
        numberRooms: '2',
        floor: '2',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Vendida'
    },
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '7',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Reservada'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '8',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Vendida'
    },
    {
        block: 'Maragogi',
        numberRooms: '3',
        floor: '7',
        totalArea: '32,99 m2',
        column: '14',
        status: 'Reservada'
    },
    {
        block: 'Trancoso',
        numberRooms: '3',
        floor: '8',
        totalArea: '46,59 m2',
        column: '16',
        status: 'Reservada'
    },
];



function defineClass(status) {
    const available = 'status-available';
    const reserved = 'status-reserved';
    const sold = 'status-sold';

    if(status === 'Disponível') return available;
    if(status === 'Reservada') return reserved;
    if(status === 'Vendida') return sold;
}

const table = document.getElementById('table-body');

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


