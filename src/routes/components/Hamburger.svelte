<script lang="ts">
	export let open;

	const toggle = () => (open = !open);
</script>

<button
	aria-label="menu"
	class="flex flex-col h-12 top-0 right-0 w-12 z-20 justify-center items-center focus:outline-none lg:hidden sm:h-16 sm:w-16"
	on:click={toggle}
>
	<div
		class="rounded-full my-0.75 transition-transform transform bg-gray-500 dark:bg-gray-400 w-6 h-0.5 {open
			? 'rotate-45'
			: ''}"
	/>
	<div
		class="rounded-full my-0.75 transition-opacity bg-gray-500 dark:bg-gray-400 w-6 h-0.5 {open
			? 'opacity-0'
			: ''}"
	/>
	<div
		class="rounded-full my-0.75 transition-all transform bg-gray-500 dark:bg-gray-400 w-6 h-0.5 {open
			? '-rotate-45 -mt-3.25'
			: ''}"
	/>
</button>
