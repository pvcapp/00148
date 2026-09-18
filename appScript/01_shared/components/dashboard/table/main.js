const table = (schema, data, type='table_01') =>
{
    let table = null;
    switch(type)
    {
        case 'table_01':
            table = table_01(schema, data);
            break;
        default:
            table = table_01(schema, data);
            break;
    }
    container.appendChild(table);
    return container;
}