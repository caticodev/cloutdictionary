<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Cross from './icons/Cross.svelte';

	export let close;
	export let action;
	let submitted = false;
	let octokit, word, definition, usage, issueLink;

	const load = async () => {
		octokit = await import('https://cdn.skypack.dev/@octokit/request');
	};

	onMount(load);

	const createIssue = async () => {
		const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
			headers: {
				authorization: `token ${import.meta.env.VITE_GITHUB_API}`
			},
			owner: 'cat-ico',
			repo: 'cloutdictionary',
			title: `${action} word: ${word?.trim()}`,
			body: `**Definition**: ${definition?.trim()}\n**Usage**: ${usage?.trim()}`
		});
		console.log('TCL:   res', res);
	};
</script>

<div
	class="flex-col outline-none inset-0 text-gray-400 z-50 overflow-x-hidden fixed justify-center md:flex focus:outline-none"
>
	<div
		transition:fly={{ duration: 150, y: 50, opacity: 0, easing: sineInOut }}
		class="rounded-lg mx-auto min-h-full outline-none bg-gray-900 shadow-lg text-center px-3 pt-16 pb-10 relative md:max-w-xl focus:outline-none sm:px-10 md:min-h-0 md:px-20 lg:max-w-3xl xl:py-14"
	>
		<h2 class="font-medium mb-5 text-gray-200 text-2xl">
			{#if submitted}
				Thank you!
			{:else}
				{action === 'request' ? 'Request new word' : 'Add new word definition'}
			{/if}
		</h2>
		<button
			class="transition top-5 right-5 text-gray-400 absolute focus:outline-none hover:text-primary"
			on:click={close}
		>
			<Cross class="h-6 stroke-5 w-6" />
		</button>
		{#if submitted}
			<div class="flex flex-col justify-center items-center">
				<p class="text-xl">
					The word was submitted. You can track the progres of the submission at <a
						href={issueLink}
						target="_blank"
						rel="noopener noreferrer">Github</a
					>.
				</p>
			</div>
		{:else}
			<div class="mx-auto max-w-md text-left w-full">
				<form name="submit" class="w-full">
					<div class="mb-4 relative">
						<label for="word" class="text-sm text-gray-400 leading-7">Word</label>
						<input
							bind:value={word}
							type="text"
							id="word"
							name="word"
							class="border rounded outline-none bg-gray-600 bg-opacity-20 border-gray-600 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-100 leading-8 duration-200 focus:bg-transparent focus:ring-2 focus:ring-green-900 focus:border-green-500"
						/>
					</div>
					{#if action !== 'request'}
						<div class="mb-4 relative">
							<label for="definition" class="text-sm text-gray-400 leading-7"
								>Definition (markdown supported)</label
							>
							<textarea
								bind:value={definition}
								id="definition"
								name="definition"
								class="border rounded outline-none bg-gray-600 bg-opacity-20 border-gray-600 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-100 leading-8 duration-200 focus:bg-transparent focus:ring-2 focus:ring-green-900 focus:border-green-500"
							/>
						</div>
						<div class="mb-4 relative">
							<label for="usage" class="text-sm text-gray-400 leading-7"
								>Example of usage (optional)</label
							>
							<textarea
								bind:value={usage}
								id="usage"
								name="usage"
								class="border rounded outline-none bg-gray-600 bg-opacity-20 border-gray-600 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-100 leading-8 duration-200 focus:bg-transparent focus:ring-2 focus:ring-green-900 focus:border-green-500"
							/>
						</div>
					{/if}
					<div class="mt-10 text-center">
						<button
							on:click={createIssue}
							disabled={action === 'request'
								? !word?.trim()
								: !(word?.trim() && definition?.trim())}
							class="rounded bg-green-500 border-0 text-white text-lg py-2 px-8 focus:outline-none hover:bg-green-600 disabled:(bg-gray-500 opacity-50 pointer-events-none)"
							>Submit</button
						>
					</div>
				</form>
			</div>
		{/if}
	</div>
</div>
<div
	transition:fade={{ duration: 150, easing: sineInOut }}
	class="bg-black opacity-30 inset-0 z-40 fixed"
/>
