<script>
	import { summarise } from '$lib/client/ai.js';

	let { data } = $props();

	let note = $state(null);
	let title = $state('');
	let body = $state('');
	let loadError = $state('');
	let status = $state('');
	let statusIsError = $state(false);
	let summary = $state('');

	$effect(() => {
		load(data.id);
	});

	async function load(id) {
		note = null;
		loadError = '';
		summary = '';
		try {
			const res = await fetch(`/api/notes/${id}`);
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
				loadError = json.message ?? `Request failed (${res.status}).`;
				return;
			}
			note = json;
			title = json.title;
			body = json.body;
		} catch {
			loadError = 'Could not reach the server.';
		}
	}

	async function save(e) {
		e.preventDefault();
		status = 'Saving…';
		statusIsError = false;
		try {
			const res = await fetch(`/api/notes/${data.id}`, {
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ title, body })
			});
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
				status = json.message ?? `Save failed (${res.status}).`;
				statusIsError = true;
				return;
			}
			status = 'Saved.';
		} catch {
			status = 'Could not reach the server.';
			statusIsError = true;
		}
	}

	async function runSummary() {
		summary = await summarise(body);
	}
</script>

<svelte:head><title>Note {data.id} – Notes Review Lab</title></svelte:head>

<p><a href="/notes">← All notes</a></p>
<h1>Note #{data.id}</h1>

{#if loadError}
	<p class="error">{loadError}</p>
{:else if !note}
	<p>Loading…</p>
{:else}
	<form onsubmit={save}>
		<label>Title <input bind:value={title} required /></label>
		<label>Body <textarea bind:value={body}></textarea></label>
		<button>Save</button>
		{#if status}<span class={statusIsError ? 'error' : 'ok'}> {status}</span>{/if}
	</form>

	<h2>AI summary</h2>
	<button onclick={runSummary}>Summarise (mock)</button>
	{#if summary}<p><em>{summary}</em></p>{/if}
{/if}
