@extends('layout.app')

@section('title', 'Home | Welcome')

@section('content')

    <div class="section">
        <div class="container">
            <h1 class="mt-5 mb-4">Manage Product Inventory</h1>
            <form id="productForm" method="post">
                @csrf
                <div class="mb-3">
                    <label for="productName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="productName" name="productName" required>
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Quantity in Stock</label>
                    <input type="number" class="form-control" id="quantity" name="quantity" required>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price per Item</label>
                    <input type="number" step="0.01" class="form-control" id="price" name="price" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="mt-5" id="productList">
                <!-- Product list will be displayed here -->
            </div>
        </div>
    </div>

@endsection
