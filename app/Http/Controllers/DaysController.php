<?php

namespace App\Http\Controllers;

use App\Models\Days;
use App\Models\Entity;
use Illuminate\Http\Request;

class DaysController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show(Days $days)
    {
        //
    }


    public function update(Request $request, Days $days)
    {
        //
    }


    public function destroy(Days $days)
    {
        //
    }
}
