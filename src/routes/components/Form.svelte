<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Cross from './icons/Cross.svelte';

	export let close;
	export let action;
	export let post;
	let submitted = false;
	let octokit, issueLink;
	let { word, definition, usage } = post || {};

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
			body: `# Definition\n${definition?.trim()}\n# Usage\n${usage?.trim()}`
		});
		issueLink = res.data.html_url;
		submitted = true;
	};
</script>

<div
	class="flex-col outline-none inset-0 z-50 overflow-x-hidden fixed justify-center md:flex focus:outline-none"
>
	<div
		transition:fly={{ duration: 150, y: 50, opacity: 0, easing: sineInOut }}
		class="rounded-lg mx-auto min-h-full outline-none bg-gray-50 shadow-lg text-center px-3 pt-16 pb-10 relative md:max-w-xl focus:outline-none dark:bg-gray-900 sm:px-10 md:min-h-0 md:px-20 lg:max-w-3xl xl:py-14"
	>
		<h2 class="mb-5 text-gray-600 text-2xl dark:text-gray-200">
			{#if submitted}
				Thank you!
			{:else}
				{action === 'edit'
					? 'Edit word'
					: action === 'request'
					? 'Request new word'
					: 'Add new word definition'}
			{/if}
		</h2>
		<button
			class="transition top-5 right-5 absolute focus:outline-none hover:text-primary"
			on:click={close}
		>
			<Cross class="h-6 stroke-5 w-6" />
		</button>
		{#if submitted}
			<div class="flex flex-col justify-center items-center">
				<p class="text-xl">
					The word was submitted.<br />You can track the progres of the submission at
					<a
						href={issueLink}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors text-gray-600 hover:text-primary dark:text-gray-200">Github</a
					>.
				</p>
			</div>
		{:else}
			<div class="mx-auto max-w-md text-left w-full">
				<form name="submit" class="w-full" on:submit|preventDefault={createIssue}>
					<div class="mb-4 relative">
						<label for="word" class="text-sm leading-8">Word</label>
						<input
							bind:value={word}
							type="text"
							id="word"
							name="word"
							class="border rounded outline-none bg-gray-200 bg-opacity-20 border-gray-300 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-800 duration-200 focus:bg-transparent dark:text-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:border-green-500"
						/>
					</div>
					{#if action !== 'request'}
						<div class="mb-4 relative">
							<label for="definition" class="text-sm leading-8"
								>Definition (markdown supported)</label
							>
							<textarea
								rows="5"
								bind:value={definition}
								id="definition"
								name="definition"
								class="border rounded outline-none bg-gray-200 bg-opacity-20 border-gray-300 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-800 duration-200 focus:bg-transparent dark:text-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:border-green-500"
							/>
						</div>
						<div class="mb-4 relative">
							<label for="usage" class="text-sm leading-8">Example of usage (optional)</label>
							<textarea
								bind:value={usage}
								id="usage"
								name="usage"
								class="border rounded outline-none bg-gray-200 bg-opacity-20 border-gray-300 text-base w-full py-1 px-3 transition-colors ease-in-out text-gray-800 duration-200 focus:bg-transparent dark:text-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:border-green-500"
							/>
						</div>
					{/if}
					<div class="mt-10 text-center">
						<button
							type="submit"
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
