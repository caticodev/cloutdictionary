<script>
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';

	import ModeSwitch from './ModeSwitch.svelte';
	import Logo from './Logo.svelte';
	import Links from './Links.svelte';
	import Buttons from './Buttons.svelte';
	import Hamburger from './Hamburger.svelte';

	let open = false;
</script>

<header>
	<div class="container flex mx-auto p-5 items-center">
		<Logo />
		<div class="flex md:ml-auto items-center justify-center <lg:hidden">
			<Links />
			{#if browser}
				<ModeSwitch />
			{/if}
		</div>

		{#if open}
			<aside
				transition:fly={{ x: 213, opacity: 0.75 }}
				class="h-full bg-gray-200 shadow-xl pt-20 transition-all top-0 right-0 w-53 z-10 absolute dark:bg-gray-900"
			>
				<Buttons />
				<div class="flex w-full pb-5 bottom-0 absolute items-center justify-center">
					<Links />
					{#if browser}
						<ModeSwitch />
					{/if}
				</div>
			</aside>
		{/if}
		<Hamburger bind:open />
	</div>
</header>
