<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
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
