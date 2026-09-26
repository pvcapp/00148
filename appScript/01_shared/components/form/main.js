const buildForm = (columnList = []) => {
    const form = div({className: 'form__grid'});
    const isEnabled = value => value === true || value === 1 || value === '1';

    columnList.forEach(column => {
        if (!column || !column.name || column.show === false || column.show === 0 || column.show === '0') return;


        form.appendChild(formField({
            id: column.name,
            type: column.type,
            value: column.value,
            caption: column.caption,
            required: column.require,
            readonly: column.readonly,            
            placeholder: column.placeholder || '',
            maxlength: column.maxlength,
            hidden: column.hidden,
            inputmode: column.inputmode,
            selectOptions: column.selectOptions || []
        }));
    });

    return form;
};






const resetForm = (id) => {
    const form = $('#' + id);
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
        if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = false;
        }
        else {
            el.value = '';
        }
    });
};