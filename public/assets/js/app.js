$(document).ready(function() {
    const productList = $('#productList');

    $('#productForm').submit(function(event) {
      event.preventDefault();

      const formData = $(this).serialize();
      var url = '/save-items';
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
          console.log(response);
          displayProducts(response.products);
          $('#productForm')[0].reset();
        },
        error: function(xhr, status, error) {
          console.error('Error saving data:', error);
        }
      });
    });

    let total = 0;

    function displayProducts(products) {
      productList.empty();

      products.forEach(product => {
        var row = $('<div class="row border-bottom py-2"></div>');

        const columns = [
          { name: 'productName', label: 'Product Name' },
          { name: 'quantity', label: 'Quantity in Stock' },
          { name: 'price', label: 'Price per Item' },
          { name: 'datetime', label: 'Date Time Submitted' },
          { name: 'totalValue', label: 'Total Value Number' }
        ];

        columns.forEach(column => {
          const r = $(`<div class="col">${product[column.name]}</div>`);
          total += parseFloat(product['totalValue']);
          row.append(r);
        });

        productList.append(row);
      });

      //last row
      row = $('<div class="row border-bottom py-2 justify-content-end"></div>');
      var col = $(`<div class="col">Total Values: ${parseFloat(total)}</div>`);
      row.append(col);
      productList.append(row);

    }
  });
