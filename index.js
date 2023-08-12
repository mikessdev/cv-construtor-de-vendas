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