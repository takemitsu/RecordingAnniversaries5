@extends('layouts.app')

@section('content')

    <guest-layout>

        @if ($errors->any())
            <v-container grid-list-xl text-xs-center class="pt-0">
                <v-layout row wrap>
                    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>
                        @foreach ($errors->all() as $error)
                            <v-alert :value="true" type="error" outline>{{$error}}</v-alert>
                        @endforeach
                    </v-flex>
                </v-layout>
            </v-container>
        @endif

        <auth-login></auth-login>
    </guest-layout>
@endsection
