import Vue from 'vue';

Vue.directive('focus', {
    // Когда привязанный элемент вставлен в DOM...
    inserted: (el) => {
        // Переключаем фокус на элемент
        const input = el.getElementsByTagName('input')[0];
        input.focus();
    },
});

/**
 * Function for validation directive.
 * 
 * @param {*} el 
 * @param {*} binding 
 */
const validate = (el, binding) => {
    const skipValidation = binding.value.skipValidation;
    const isValid = binding.value.isValid;
    const querySelector = binding.value.querySelector;
    const validationMessage = binding.value.validationMessage;

    if (skipValidation) {
        return;
    }

    const element = el.querySelector(querySelector);
    if (!element) {
        return;
    }

    if (isValid) {
        if (element.classList.contains('validation-error')) {
            element.classList.remove('validation-error');

            const errorElement = element.nextSibling;
            element.parentNode.removeChild(errorElement);
        }
    } else {
        if (element.classList.contains('validation-error')) {
            return;
        }

        element.classList.add('validation-error');

        const errorMessageElement = document.createElement('div');
        errorMessageElement.classList.add('validation-error__message');
        errorMessageElement.innerHTML = `${ validationMessage }`;

        element.after(errorMessageElement);
    }
};

Vue.directive('validate', {
    inserted: (el, binding) => {
        validate(el, binding);
    },
    update: (el, binding) => {
        validate(el, binding);
    },
    componentUpdated: (el, binding) => {
        validate(el, binding);
    },
});

