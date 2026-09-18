const table_01_schema = {
    name: '', caption: '', type: {type: '', options: {}}, key: 0, 
    formula: '', initialValue: null, 
    show: 1, editable: 1, require: 0,  search: 1};

const table_01 = (danhSachCotSchema = [], data = []) => 
{
    const table = document.createElement('table');
    table.className = 'table_01';

        const thead = document.createElement('thead');
        thead.className = 'table_01__header';
            const headRow = document.createElement('tr');
            danhSachCotSchema.forEach(schema => {
                const th = document.createElement('th');
                th.textContent = schema.caption || schema.name;
                headRow.appendChild(th);
            });

            thead.appendChild(headRow);
        table.appendChild(thead);

    const rows = data;
    const tbody = document.createElement('tbody');
        rows.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.className = 'table_01__row';
            /*
            danhSachCotSchema.forEach(schema => {               

                td.appendChild(control);
                tr.appendChild(td);
            });*/
            row.forEach(value => {
                document.createElement('td');
                td.innerHTML = value;
                tr.appendChild(td);
            });                
            tbody.appendChild(tr);
        });

    table.appendChild(tbody);
    return table;
};


const getInputType = type => {
    switch (String(type || '').toLowerCase()) {
        case 'number':
        case 'decimal':
        case 'price':
            return 'number';

        case 'date':
            return 'date';

        case 'datetime':
        case 'date-time':
            return 'datetime-local';

        case 'time':
            return 'time';

        case 'email':
            return 'email';

        case 'url':
            return 'url';

        case 'yes/no':
        case 'boolean':
        case 'checkbox':
            return 'checkbox';

        default:
            return 'text';
    }
};


const convertTableValue = (value, type) => {
    switch (String(type || '').toLowerCase()) {
        case 'number':
        case 'decimal':
        case 'price':
            return value === '' ? null : Number(value);

        case 'yes/no':
        case 'boolean':
        case 'checkbox':
            return value === true || value === 'true' || value === 'on';

        default:
            return value;
    }
};


const formatTableValue = (value, type) => {
    if (value === undefined || value === null) return '';

    if (String(type || '').toLowerCase() === 'boolean') {
        return value ? 'Có' : 'Không';
    }

    return String(value);
};