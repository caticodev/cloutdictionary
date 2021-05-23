<script>
	import { browser } from '$app/env';

	import ModeSwitch from './ModeSwitch.svelte';
	import Logo from './Logo.svelte';
	import Links from './Links.svelte';
</script>

<header>
	<div class="container flex flex-wrap flex-col mx-auto p-5 md:flex-row items-center">
		<Logo />
		<div class="flex flex-wrap text-base md:ml-auto items-center justify-center">
			<Links />
			{#if browser}
				<ModeSwitch />
			{/if}
		</div>
	</div>
</header>
