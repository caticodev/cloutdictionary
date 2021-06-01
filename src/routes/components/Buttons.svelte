<script lang="ts">
	import Form from './Form.svelte';
	import Plus from './icons/Plus.svelte';
	import Write from './icons/Write.svelte';

	let showModal = false;
	let action;
	let actions = ['request', 'add'];

	const toggleModal = (val) => {
		action = val;
		showModal = !showModal;
	};
</script>

<div class="mx-auto p-5 right-0 absolute">
	{#each actions as action}
		<button
			title={action === 'request' ? 'Request word' : 'Add definition'}
			on:click={() => toggleModal(action)}
			class="border-transparent rounded-lg flex bg-gray-100 border-2 mb-5 py-3 px-4 transition-colors justify-center focus:outline-none hover:border-primary dark:hover:border-primary hover:text-primary dark:bg-gray-800"
		>
			{#if action === 'request'}
				<Plus class="h-6 stroke-2 w-6" />
			{:else}
				<Write class="h-6 stroke-2 w-6" />
			{/if}
			<span class="pl-3 @lg:hidden whitespace-nowrap">
				{action === 'request' ? 'Request word' : 'Add definition'}
			</span>
		</button>
	{/each}
</div>
{#if showModal}
	<Form close={() => toggleModal(null)} bind:action />
{/if}
