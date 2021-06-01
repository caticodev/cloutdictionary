<script lang="ts">
	import { format } from 'date-fns';
	import marked from 'marked';
	import Edit from './Edit.svelte';
	export let post;
</script>

{#if post}
	<div id={post.word} class="mx-auto max-w-2xl p-5 card">
		<div class="rounded-lg flex flex-col h-full bg-gray-100 p-8 relative dark:bg-gray-800">
			<Edit bind:post />
			<p class="text-sm opacity-50 inline-flex items-center">
				{format(new Date(post.date), 'PP')}
			</p>
			<h2 class="font-display my-8 text-primary tracking-widest text-3xl">
				{post.word}
			</h2>
			<p class="font-light text-lg tracking-wider whitespace-pre-wrap">
				{@html marked.parseInline(post.definition)}
			</p>
			<p
				class="font-light mt-8 text-lg tracking-wider inline-flex items-center italic whitespace-pre-wrap"
			>
				{@html marked.parseInline(post.usage)}
			</p>
		</div>
	</div>
{/if}

<style global>
	.card a {
		@apply text-gray-900 transition-colors;
	}
	.dark .card a {
		@apply text-white;
	}
	.card a:hover {
		@apply text-primary;
	}
</style>
