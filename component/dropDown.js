//TODO: Fechar eventListener

function toggleDropdown(dropDown, dropdownContent) {
    const dropdownContentContainer = document.getElementById(dropdownContent);
    dropdownContentContainer.style.display = dropdownContentContainer.style.display ===  "block" ?  "none" : "block";
    eventClickOut(dropDown, dropdownContent)
  }


function selectItem(dropdownContent, button, element) {
  closeDropdown(dropdownContent);
  const ButtonText = document.getElementById(button);
  return ButtonText.textContent = element.textContent;
}

function closeDropdown(dropdownContent) {
  const dropdown = document.getElementById(dropdownContent)
  dropdown.style.display = "none";
}


function eventClickOut(dropDown, dropdownContent) {
document.addEventListener("click", (event) =>  {
  const dropDownContainer = document.getElementById(dropDown);

    const dropdownContentContainer = document.getElementById(dropdownContent);
    const clickedOut = !dropDownContainer.contains(event.target);
    const dropDownIsOpen = dropdownContentContainer.style.display === "block";

    if (clickedOut && dropDownIsOpen) {
       closeDropdown(dropdownContent)
      }
});
}
