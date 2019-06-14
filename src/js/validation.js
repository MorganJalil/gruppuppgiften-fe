(function IIFE() {
    const $form1 = document.getElementById('form');

    const pNumPattern = /\d{6}[+-]\d{4}/;
    const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const datePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    function onSubmitForm(e) {
      let formValid = true;
      for (let i = 0; i<e.target.length; i++) {
        e.target[i].style.borderColor = '';
        const inputValue = e.target[i].value;
        const inputDataType = e.target[i].getAttribute('data-type');
  
        switch (inputDataType) {
          case 'personal number':
            if (!inputValue.match(pNumPattern)) {
              alert('not personal number');
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'time':
            if (!inputValue.match(datePattern)) {
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'name':
            if (!inputValue.match(namePattern)) {
              e.target[i].className = 'error';
              formValid = false;
            }
            else {
              e.target[i].className = '';
            }
            break;

            case 'email':
            if (!inputValue.match(emailPattern)) {
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
      console.log(e.target.getAttribute('id'));
      e.target.style.borderColor = 'red';
    }
  
    function registerInvalidListeners(form) {
      for (let i=0; i<form.length; i++) {
        form[i].addEventListener('invalid', onInvalid);
      }
    }
  
    function registerListeners() {
      $form1.addEventListener('submit', onSubmitForm);
      registerInvalidListeners($form1);  
    }
  
    function pageLoaded() {
      registerListeners();
    }
  
    window.pageLoaded = pageLoaded;
  })();