<script>
	let { form } = $props();
</script>

<svelte:head><title>Sign in – Notes Review Lab</title></svelte:head>

<h1>Sign in</h1>
<p>
	This is a <strong>deliberately insecure practice app</strong> for a security class. Use one of
	the fictional practice accounts from your exercise sheet. Do not enter real credentials.
</p>

<form method="POST">
	<label>Email <input name="email" type="email" value={form?.email ?? ''} required /></label>
	<label>Password <input name="password" type="password" required /></label>
	{#if form?.error}<p class="error">{form.error}</p>{/if}
	<button>Sign in</button>
</form>
