(function IIFE() {
    const $submitForm = document.getElementById('registrationForm');

    const pNumValidation = /\d{6}[+-]\d{4}/;
    const nameValidation = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dateValidation = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    function onSubmitForm(e) {
      let formValid = true;
      for (let i = 0; i<e.target.length; i++) {
        e.target[i].style.borderColor = '';
        const inputValue = e.target[i].value;
        const inputDataType = e.target[i].getAttribute('data-type');
  
        switch (inputDataType) {
          case 'personal number':
            if (!inputValue.match(pNumValidation)) {
              alert('not a valid personal number');
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'time':
            if (!inputValue.match(dateValidation)) {
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'name':
            if (!inputValue.match(nameValidation)) {
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'email':
            if (!inputValue.match(emailValidation)) {
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;
        }
      }
  
      // If form is not valid, we prevent default action - which is submitting form
      if (!formValid) {
        e.preventDefault();
      }
    }
  
    function onInvalid(e) {
      e.preventDefault();
      e.target.style.borderColor = 'red';
    }
  
    function registerInvalidListeners(form) {
      for (let i=0; i<form.length; i++) {
        form[i].addEventListener('invalid', onInvalid);
      }
    }
  
    function registerListeners() {
      $submitForm.addEventListener('submit', onSubmitForm);
      registerInvalidListeners($submitForm);  
    }
  
    function validateInput() {
      registerListeners();
    }
  
    window.validateInput = validateInput;
  })();