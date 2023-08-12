const toggleDropdown = (dropDown, dropdownContent) => {
    const dropdownContentContainer = document.getElementById(dropdownContent);

    dropdownContentContainer.style.display = dropdownContentContainer.style.display ===  "block" ?  "none" : "block";
    eventClickOut(dropDown, dropdownContent)
  }


const selectItem = (dropdownContent, button, element) => {
  closeDropdown(dropdownContent);
  const ButtonText = document.getElementById(button);
  return ButtonText.textContent = element.textContent;
}

const closeDropdown = (dropdownContent) => {
  const dropdown = document.getElementById(dropdownContent)
  dropdown.style.display = "none";
}


const eventClickOut = (dropDown, dropdownContent) => {
document.addEventListener("click", function(event) {

  const dropDownContainer = document.getElementById(dropDown);
  if(dropDownContainer){
    const dropdownContentContainer = document.getElementById(dropdownContent);
    const clickedOut = !dropDownContainer.contains(event.target);
    const dropDownIsOpen = dropdownContentContainer.style.display === "block";

    if (clickedOut && dropDownIsOpen) {
      return closeDropdown(dropdownContent)
    }
  }

});
}
