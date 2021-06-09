<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mizoram computer</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        #app{
            background: #f6f6f6;
            height: 100vh;
        }
    </style>
</head>

<body>

<!-- React root DOM -->
<div id="app">
</div>

<!-- React JS -->
<script defer type="text/javascript" src="{{ asset('js/app.js') }}"></script>

{{--<script src="js/app.js"></script>--}}

</body>
</html>
