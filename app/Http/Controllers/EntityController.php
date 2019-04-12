<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class EntityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function pickup()
    {
        $user = auth()->user();

        $entities = Entity::where('user_id',$user->id)
            ->has('days')
            ->with('days')
            ->orderBy('created_at', 'asc')
            ->get();

        foreach ($entities as $key => $entity) {
            if (count($entity->days) == 0) {
                unset ($entities[$key]);
            } else {
                // diff_days で sort
                $sorted = array_values(Arr::sort($entity->days, function ($value) {
                    return $value['diff_days'];
                }));
                unset($entities[$key]->days);
                $entities[$key]->days = $sorted;
            }
        }

        return $entities;
    }


    public function index()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show(Entity $entity)
    {
        //
    }


    public function update(Request $request, Entity $entity)
    {
        //
    }


    public function destroy(Entity $entity)
    {
        //
    }
}
