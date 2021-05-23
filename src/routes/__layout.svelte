<script>
	import '../app.css';
	import 'virtual:windi.css';
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');

	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
</script>

<svelte:head>
	<title>Clout dictionary</title>
</svelte:head>

<div id="svelte" class="flex flex-col h-full">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
