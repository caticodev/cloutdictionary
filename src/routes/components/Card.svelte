<script>
	export let post;
</script>

{#if post}
	<div class="mx-auto max-w-2xl p-4">
		<div class="rounded-lg flex flex-col h-full bg-gray-100 p-8 dark:bg-gray-800">
			<p class="text-sm opacity-50 inline-flex items-center">{post.date}</p>
			<h2 class="font-black font-mono my-8 text-primary tracking-widest text-3xl">
				{post.phrase}
			</h2>
			<p class="font-light text-lg tracking-wide">
				{post.definition}
			</p>
			<p class="font-light mt-8 text-lg tracking-wide inline-flex items-center italic">
				{post.usage}
			</p>
		</div>
	</div>
{/if}
