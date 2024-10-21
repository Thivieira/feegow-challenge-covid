@php
    $APP_NAME = config('app.name');
    $COMPANY_NAME = config('app.company_name');
@endphp

<!DOCTYPE html>
<html lang="{{ config('app.locale', 'en') }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $APP_NAME }}</title>
    @vite(['resources/css/app.css'])
</head>

<body>

    <div class="max-w-[50rem] flex flex-col mx-auto size-full">
        <header class="mb-auto flex justify-center z-50 w-full py-4">
            <nav class="px-4 sm:px-6 lg:px-8">
                <a class="flex-none text-xl font-semibold sm:text-3xl dark:text-white" href="#" aria-label="Brand">
                    {{ $APP_NAME }}
                </a>
            </nav>
        </header>
        <main id="content">
            <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
                <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
                <p class="mt-3 text-gray-600 dark:text-neutral-400">Ops, algo deu errado.</p>
                <p class="text-gray-600 dark:text-neutral-400">Desculpe, não conseguimos encontrar sua página.</p>
                <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                    <a href="{{ url('/') }}"
                        class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-hover focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        Voltar para o início
                    </a>
                </div>
            </div>
        </main>
        <footer class="mt-auto text-center py-5">
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-sm text-gray-500 dark:text-neutral-500">
                    © {{ $COMPANY_NAME }} Todos os Direitos Reservados. 2024.
                </p>
            </div>
        </footer>
    </div>
</body>

</html>