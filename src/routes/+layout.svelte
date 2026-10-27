<script>
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

	let { data, children } = $props();
	let resetMsg = $state('');

	async function resetApp() {
		const res = await fetch('/api/reset', { method: 'POST' });
		resetMsg = res.ok ? 'Practice data reset.' : 'Reset failed.';
		await invalidateAll();
		setTimeout(() => (resetMsg = ''), 3000);
	}
</script>

<div class="banner">
	⚠ Intentionally vulnerable practice app. Local use only — never deploy. Fictional data.
</div>

<header>
	<strong>Notes Review Lab</strong>
	<a href="/hints">Hints</a>
	{#if data.user}
		<nav>
			<a href="/notes">Notes</a>
			{#if data.user.role === 'admin'}<a href="/admin">Admin</a>{/if}
		</nav>
		<span class="who">{data.user.email} ({data.user.role})</span>
		<form method="POST" action="/logout" use:enhance={() => async ({ update }) => { await update(); goto('/login'); }}>
			<button>Log out</button>
		</form>
	{/if}
	<button class="reset" onclick={resetApp}>Reset practice data</button>
	{#if resetMsg}<span class="ok">{resetMsg}</span>{/if}
</header>

<main>{@render children()}</main>

<style>
	:global(body) {
		font-family: system-ui, sans-serif;
		margin: 0;
		color: #1b1b1b;
		background: #fafafa;
	}
	.banner {
		background: #b00020;
		color: white;
		padding: 0.4rem 1rem;
		font-size: 0.9rem;
	}
	header {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #ddd;
		background: white;
	}
	nav {
		display: flex;
		gap: 0.75rem;
	}
	.who {
		margin-left: auto;
		color: #555;
	}
	.reset {
		margin-left: auto;
	}
	.who + form + .reset {
		margin-left: 0;
	}
	.ok {
		color: #1a7f37;
	}
	main {
		max-width: 46rem;
		margin: 1.5rem auto;
		padding: 0 1rem;
	}
	:global(input, textarea) {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem;
		font: inherit;
		margin: 0.25rem 0 0.75rem;
	}
	:global(textarea) {
		min-height: 9rem;
	}
	:global(.error) {
		color: #b00020;
	}
	:global(.ok) {
		color: #1a7f37;
	}
	:global(table) {
		border-collapse: collapse;
		width: 100%;
	}
	:global(th, td) {
		border: 1px solid #ddd;
		padding: 0.4rem 0.6rem;
		text-align: left;
	}
</style>
