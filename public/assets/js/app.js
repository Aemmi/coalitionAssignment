$(document).ready(function() {
    const productList = $('#productList');
    let productsData = [];

    $.getJSON('./products.json', function(data) {
      productsData = data;
      displayProducts();
    });

    $('#productForm').submit(function(event) {
      event.preventDefault();

      const productName = $('#productName').val();
      const quantity = parseInt($('#quantity').val());
      const price = parseFloat($('#price').val());
      const datetime = new Date().toISOString();
      const totalValue = quantity * price;

      const product = {
        productName,
        quantity,
        price,
        datetime,
        totalValue
      };

      productsData.push(product);

      $.ajax({
        type: 'POST',
        url: "{{route('saveItems')}}",
        contentType: 'application/json',
        data: JSON.stringify(productsData),
        success: function(response) {
          console.log(response);
          displayProducts();
          $('#productForm')[0].reset();
        },
        error: function(xhr, status, error) {
          console.error('Error saving data:', error);
        }
      });
    });

    function displayProducts() {
      productList.empty();
      productsData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      productsData.forEach(product => {
        const row = $('<div class="row border-bottom py-2"></div>');

        const columns = [
          { name: 'productName', label: 'Product Name' },
          { name: 'quantity', label: 'Quantity in Stock' },
          { name: 'price', label: 'Price per Item' },
          { name: 'datetime', label: 'Date Time Submitted' },
          { name: 'totalValue', label: 'Total Value Number' }
        ];

        columns.forEach(column => {
          const cell = $(`<div class="col">${product[column.name]}</div>`);
          row.append(cell);
        });

        productList.append(row);
      });
    }
  });
