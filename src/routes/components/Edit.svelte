<script lang="ts">
	import Form from './Form.svelte';
	import Edit from './icons/Edit.svelte';
	export let post;

	let showModal = false;
	let action = 'edit';

	const toggleModal = () => (showModal = !showModal);
</script>

<div class="top-0 right-0 text-gray-400 absolute dark:text-gray-600">
	<button on:click={toggleModal} class="p-2 transition-colors hover:text-primary focus:outline-none"
		><Edit class="h-8 w-8" /></button
	>
</div>
{#if showModal}
	<Form close={toggleModal} bind:action bind:post />
{/if}
