//TODO: checar de onde vem a informação de status de venda.

//Unidades Disponível
let availableUnits;
let blockedUnits;
let soldUnits;
let reservedUnits;

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

//Situação do Empreendiemnto

updateText('enterprise-available', availableUnits);

blockedUnits = enterpriseUnits.filter(e => e.status === status.blocked).length;

updateText('enterprise-blocked', blockedUnits);

soldUnits = enterpriseUnits.filter(e => e.status === status.sold).length;

updateText('enterprise-sold', soldUnits);

reservedUnits = enterpriseUnits.filter(e => e.status === status.reserved).length;

updateText('enterprise-reserved', reservedUnits);

//Filtrar Disponibilidade




const getFiltersValue = () => {
    const ButtonText01 = document.getElementById('btn-01').textContent;
    const ButtonText02 = document.getElementById('btn-02').textContent;
    const ButtonText03 = document.getElementById('btn-03').textContent;

    return {
        opção01: ButtonText01,
        opção02: ButtonText02,
        opção03: ButtonText03,
    }
}