<script lang="ts">
	import { format } from 'date-fns';
	import marked from 'marked';
	import Edit from './Edit.svelte';
	export let post;
</script>

{#if post}
	<div
		id={post.word.split('/')[0].trim().replace(' ', '-').replace("'", '')}
		class="mx-auto max-w-2xl p-5 card"
	>
		<div class="rounded-lg flex flex-col h-full bg-gray-100 p-8 relative dark:bg-gray-800">
			<Edit bind:post />
			<p class="text-sm opacity-50">
				{post.date ? format(new Date(post.date), 'PP') : ''}
			</p>
			<h2 class="font-display my-8 text-primary tracking-widest text-3xl">
				{post.word}
			</h2>
			<p class="text-lg tracking-wider whitespace-pre-wrap">
				{@html marked.parseInline(post.definition)}
			</p>
			<p class="mt-8 text-lg tracking-wider italic whitespace-pre-wrap">
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
