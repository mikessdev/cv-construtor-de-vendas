const toggleDropdown = (dropDown) => {
    const dropdownContent = document.getElementById(dropDown);

    return dropdownContent.style.display = dropdownContent.style.display ===  "block" ?  "none" : "block";
  }


const selectItem = (dropDown, button, element) => {
  toggleDropdown(dropDown);
  const ButtonText = document.getElementById(button);
  return ButtonText.textContent = element.textContent
}

const closeDropdown = (dropDown) => {
  dropDown.style.display = "none";
}

//events
document.addEventListener("click", function(event) {

const dropdowns = document.getElementsByClassName('dropDown');

  for (let index in dropdowns) {
      let dropdown = document.getElementsByClassName('dropDown')[index];

      let dropdownContent = document.getElementsByClassName('dropDown-content-event')[index];

      let clickedOut = !dropdown.contains(event.target);

      const dropDownIsOpen = dropdownContent.style.display === "block";
      if (clickedOut && dropDownIsOpen) {
        closeDropdown(dropdownContent)
      }
  }

});