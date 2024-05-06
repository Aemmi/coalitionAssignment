<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {

    }

    public function store(Request $request)
    {
        $product = [
            'productName' => $request->productName,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'datetime' => now()->toIso8601String(),
            'totalValue' => $request->quantity * $request->price,
        ];

        $products = Storage::disk('public')->exists('products.json')
            ? json_decode(Storage::disk('public')->get('products.json'), true)
            : [];

        $products[] = $product;

        Storage::disk('public')->put('products.json', json_encode($products));

        return response()->json(['message' => 'Product saved successfully', 'products' => $products]);
    }
}
