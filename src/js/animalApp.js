// globals document, window
"use strict";

(function IIFE(){
  const remoteUrl = 'localhost:3000';
  let animalType = 'cat';
  const $animalSelect = document.getElementById('animal-select');
  const $animalType = document.getElementById('animal-type');
  const $animalDescription = document.getElementById('animal-description');
  const $animalToAdd = document.getElementById('animal-to-add');
  const $animalAdd = document.getElementById('animal-add');

  function clearElement(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function createOption(value, text) {
    const $option = document.createElement('option');
    $option.setAttribute('value', value);
    const $optionText = document.createTextNode(text);
    $option.appendChild($optionText);
    return $option;
  }

  function populateSelect(type) {
    clearElement($animalSelect);
    $animalSelect.setAttribute('data-loaded', 'false');
    fetch(`http://${remoteUrl}/${type}s`)
      .then((response) => response.json())
      .then((data) => {
        const animals = data.data;
        const $defaultOption = createOption(null, `Select ${type}`);
        $animalSelect.appendChild($defaultOption);
        animals.forEach((animal) => {
          const $option = createOption(animal.id, animal.name);
          $animalSelect.appendChild($option);
        });
        $animalSelect.setAttribute('data-loaded', 'true');
      });
  }

  function getByTypeAndId(type, id) {
    $animalDescription.setAttribute('data-loaded', 'false');
    clearElement($animalDescription);

    fetch(`http://${remoteUrl}/${type}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        //const $pre = document.createElement('pre');
        let text = JSON.stringify(data.data, null);
        text = text.replace(/['"{}]+/g, '');
        const $text = document.createTextNode(`${text}`);
        //$pre.appendChild($preText);
        $animalDescription.appendChild($text);
        $animalDescription.setAttribute('data-loaded', 'true');
      });
  }

  function listenToSelect() {
    $animalSelect.addEventListener('change', (e) => {
      const id = e.target.selectedOptions[0].value;
      getByTypeAndId(animalType, id);
    });
  }

  function listenToSelectType() {
    $animalType.addEventListener('change', (e) => {
      const type = e.target.selectedOptions[0].value;
      console.log(e.target);
      console.log(type);
      animalType = type;
      populateSelect(type);
    });
  }

  function listenToAdd() {
    $animalAdd.addEventListener('click', () => {
      $animalAdd.setAttribute('data-loaded', 'false');
      const dataText = $animalToAdd.value;
      const dataObject = JSON.parse(dataText);
      clearElement($animalToAdd);
      fetch(`http://${remoteUrl}/${animalType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      })
        .then(() => {
          $animalAdd.setAttribute('data-loaded', 'true');
          populateSelect(animalType);
        });
    })
  }

  function pageLoaded() {
    populateSelect(animalType);
    listenToSelectType();
    listenToSelect();
    listenToAdd();
  }

  window.pageLoaded = pageLoaded;

  module.exports = {
    clearElement,
    populateSelect,
    getByTypeAndId,
      testString: function testString(str) {
      return false;
    }
  };
})();