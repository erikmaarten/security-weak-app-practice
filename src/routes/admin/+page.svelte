<script>
	import { onMount } from 'svelte';

	let users = $state([]);
	let err = $state('');

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/users');
			const json = await res.json().catch(() => ({}));
			if (!res.ok) err = json.message ?? `Request failed (${res.status}).`;
			else users = json;
		} catch {
			err = 'Could not reach the server.';
		}
	});
</script>

<svelte:head><title>Admin – Notes Review Lab</title></svelte:head>

<h1>Admin: users</h1>
{#if err}<p class="error">{err}</p>{/if}
<table>
	<thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
	<tbody>
		{#each users as u (u.id)}
			<tr><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
		{/each}
	</tbody>
</table>
