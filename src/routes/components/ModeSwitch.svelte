<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	let theme =
		localStorage?.theme ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	$: switchTheme = theme === 'dark' ? 'light' : 'dark';
	$: document.body.className = theme;

	const switchMode = () => {
		theme = switchTheme;
		localStorage.theme = theme;
	};
</script>

<button
	class="rounded-full bg-gray-100 mode focus:outline-none dark:bg-gray-800"
	on:click={switchMode}
	aria-label="Switch to {switchTheme} mode"
/>

<style>
	.mode {
		width: 58px;
		position: relative;
		height: 32px;
		flex-shrink: 0;
		margin-left: 16px;
	}

	.mode::before {
		width: 32px;
		height: 100%;
		content: '';
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='rgba(113, 113, 122)' stroke-width='2.4' fill='rgba(113, 113, 122)' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cpath d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/%3E%3C/svg%3E");
		background-size: cover;
		left: 0;
		position: absolute;
		top: 0;
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}

	.mode::after {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 6px;
		top: 6px;
		background-color: var(--primary);
		opacity: 90%;
		content: '';
		border-radius: 50%;
		transition: transform 0.3s;
	}
	:global(.dark .mode::after) {
		transform: translateX(-24px);
	}
	:global(.dark .mode::before) {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='rgba(161, 161, 170)' stroke-width='2' fill='rgba(161, 161, 170)' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'/%3E%3C/svg%3E");
		transform: translateX(26px);
	}
</style>
