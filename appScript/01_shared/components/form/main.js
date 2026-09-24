const resetForm = (id) =>
{
    const form = $('#' + id);
    form.querySelectorAll('input, textarea, select').forEach(function(el)
    {
        if (el.type === 'checkbox' || el.type === 'radio')
        {
            el.checked = false;
        }
        else
        {
            el.value = '';
        }
    });
};