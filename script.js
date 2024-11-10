function updateTotal() {
    let totalPrice = 0;
    const rows = document.querySelectorAll('#productTable tbody tr');

    rows.forEach(row => {
        const checkbox = row.querySelector('.product-checkbox');
        const quantitySelect = row.querySelector('.quantity');
        const price = parseFloat(checkbox.getAttribute('data-price'));
        const quantity = parseInt(quantitySelect.value);

        const rowTotal = checkbox.checked ? price * quantity : 0;
        row.querySelector('.product-total-price').innerText = `Rs ${rowTotal.toFixed(2)}`;

        if (checkbox.checked) {
            totalPrice += rowTotal;
        }
    });

    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}


document.querySelectorAll('.product-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateTotal);
});

document.querySelectorAll('.quantity').forEach(select => {
    select.addEventListener('change', updateTotal);
});


function checkout() {
    const selectedProducts = [];
    const rows = document.querySelectorAll('#productTable tbody tr');

    rows.forEach(row => {
        const checkbox = row.querySelector('.product-checkbox');
        if (checkbox.checked) {
            const productName = row.cells[1].innerText;
            const quantity = row.querySelector('.quantity').value;
            const price = row.querySelector('.product-total-price').innerText;
            selectedProducts.push({ productName, quantity, price });
        }
    });

    if (selectedProducts.length > 0) {

        sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        sessionStorage.setItem('totalPrice', document.getElementById('totalPrice').innerText);


        window.location.href = 'checkout.html';
    } else {
        alert("Please select at least one product to proceed.");
    }
}


function loadOrderSummary() {
    const orderDetailsBody = document.getElementById('orderDetails');
    const selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts'));
    const totalPrice = sessionStorage.getItem('totalPrice');

    if (selectedProducts) {
        selectedProducts.forEach(product => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = product.productName;
            row.appendChild(nameCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = product.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = product.price;
            row.appendChild(priceCell);

            orderDetailsBody.appendChild(row);
        });


        document.getElementById('orderTotal').innerText = totalPrice;
    } else {
        console.warn("No order summary found in sessionStorage.");
    }
}


function confirmOrder() {
    const paymentMethod = document.getElementById('paymentSelect').value;

    if (paymentMethod) {
        alert(`Order Confirmed!\nPayment Method: ${paymentMethod}`);
        sessionStorage.clear();
    } else {
        alert("Please select a payment method.");
    }
}