<script lang="ts">
	import Form from './Form.svelte';

	let showModal = false;
	let action;
	let actions = ['request', 'add'];

	const toggleModal = (val) => {
		action = val;
		showModal = !showModal;
	};
</script>

<div class="flex mx-auto max-w-2xl p-4 justify-between">
	{#each actions as action}
		<button
			on:click={() => toggleModal(action)}
			class="rounded-lg bg-gray-100 border-2 border-gray-200 py-3 px-4 transition-colors hover:border-primary dark:hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-gray-800"
			>{action === 'request' ? 'Request word' : 'Add definition'}</button
		>
	{/each}
</div>
{#if showModal}
	<Form close={() => toggleModal(null)} bind:action />
{/if}
