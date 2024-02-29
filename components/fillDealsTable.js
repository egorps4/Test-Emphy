function fillDealsTable(deals) {
    const tableBody = document.getElementById('dealsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    deals.forEach(deal => {
        let row = tableBody.insertRow();

        let nameCell = row.insertCell(0);
        nameCell.textContent = deal.name;

        let price = row.insertCell(1);
        price.textContent = `${deal.price} руб.`;

        let createdAtCell = row.insertCell(2);
        createdAtCell.textContent = deal.created_at;

        let uodatedAtCell = row.insertCell(3);
        uodatedAtCell.textContent = deal.updated_at;

        let responsibleCell = row.insertCell(4);
        responsibleCell.textContent = deal.responsible_user_id;
    });
}

export default fillDealsTable;