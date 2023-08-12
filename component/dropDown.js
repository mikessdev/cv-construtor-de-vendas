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
  const dropdown = document.getElementById('dropDown-btn');
  const dropdown02 = document.getElementById('dropDown-01');
  const dropdown03 = document.getElementById('dropDown-02');
  const dropdown04 = document.getElementById('dropDown-03');

  const dropdownContent = document.getElementById('dropdownContent');
  const dropdownContent01 = document.getElementById('Form-Dropdown-01');
  const dropdownContent02 = document.getElementById('Form-Dropdown-02');
  const dropdownContent03 = document.getElementById('Form-Dropdown-03');

  const clickedOut = !dropdown.contains(event.target);
  const clickedOut01 = !dropdown02.contains(event.target);
  const clickedOut02 = !dropdown03.contains(event.target);
  const clickedOut03 = !dropdown04.contains(event.target);

  const dropDownIsOpen = dropdownContent.style.display === "block";
  const dropDownIsOpen01 = dropdownContent01.style.display === "block";
  const dropDownIsOpen02 = dropdownContent02.style.display === "block";
  const dropDownIsOpen03 = dropdownContent03.style.display === "block";

 
  if (clickedOut && dropDownIsOpen) {
    closeDropdown(dropdownContent)
  }

  if (clickedOut01 && dropDownIsOpen01) {
    closeDropdown(dropdownContent01)
  }

  if (clickedOut02 && dropDownIsOpen02) {
    closeDropdown(dropdownContent02)
  }

  if (clickedOut03 && dropDownIsOpen03) {
    closeDropdown(dropdownContent03)
  }
});