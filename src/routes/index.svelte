<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const res = await fetch('/index.json');

		if (res.ok) {
			return {
				props: { posts: await res.json() }
			};
		}

		return {
			error: new Error('Could not load data')
		};
	};
</script>

<script lang="ts">
	import Card from './components/Card.svelte';
	export let posts;
</script>

<section>
	<div class="container mx-auto py-24 px-5">
		{#each posts as post}
			<Card {post} />
		{/each}
	</div>
</section>
