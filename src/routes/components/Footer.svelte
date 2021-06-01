<script>
	import Links from './Links.svelte';
</script>

<footer>
	<div class="container flex flex-col mx-auto p-5 items-center sm:flex-row justify-between">
		<p
			class="mt-4 text-sm text-center text-gray-500 md:text-left dark:text-gray-400 sm:py-2 sm:mt-0"
		>
			MIT Licensed | ©
			{new Date().getFullYear()}
			Clout dictionary made by
			<a
				class="text-blue-gray-800 dark:text-white"
				target="_blank"
				rel="noopener noreferrer"
				title="catico"
				href="https://bitclout.com/u/catico"
			>
				@catico
			</a>
		</p>
		<Links />
	</div>
</footer>
