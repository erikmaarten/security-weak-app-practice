<script>
	let { data } = $props();
</script>

<svelte:head><title>Notes – Notes Review Lab</title></svelte:head>

<h1>Your notes</h1>
{#if data.notes.length === 0}
	<p>No notes.</p>
{:else}
	<ul>
		{#each data.notes as note (note.id)}
			<li><a href="/notes/{note.id}">{note.title}</a> <small>(#{note.id})</small></li>
		{/each}
	</ul>
{/if}
