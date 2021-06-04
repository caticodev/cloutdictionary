<script context="module" lang="ts">
	import { isBefore } from 'date-fns';
	import * as tz from 'date-fns-tz';

	export const load = async ({ fetch }) => {
		const res = await fetch('/index.json');
		const now = Date.now();
		const posts = (await res.json())
			.filter(({ definition, usage, date }) => definition && usage && date)
			.map((post) => {
				const releaseDate = tz.zonedTimeToUtc(`${post.date} 20:00`, 'America/Los_Angeles');
				return isBefore(releaseDate, now) ? post : { ...post, date: null };
			})
			.sort((a, b) => (!a.date ? 1 : !b.date ? -1 : b.date.localeCompare(a.date)));

		if (res.ok) {
			return {
				props: { posts }
			};
		}

		return {
			error: new Error('Could not load data')
		};
	};
</script>

<script lang="ts">
	import Card from './components/Card.svelte';
	import Buttons from './components/Buttons.svelte';
	import { title, description } from '../../package.json';
	export let posts;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
</svelte:head>

<section>
	<div class="container mx-auto pb-24 relative md:pt-5">
		<h2
			class="mx-auto text-center text-xl mb-10 tracking-wider max-w-2xl text-gray-600 leading-10 dark:text-gray-300"
		>
			{description}
		</h2>
		<div class="<lg:hidden">
			<Buttons />
		</div>
		{#each posts as post}
			<Card {post} />
		{/each}
	</div>
</section>
