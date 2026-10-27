// Mock "AI summary" helper. It never contacts any real service.

// DEFECT 4 (instructor): a "private" key shipped in browser-delivered code.
const apiKey = 'FAKE_SECRET_KEY_FOR_CLASS_ONLY';

export async function summarise(text) {
	// A real implementation would send `apiKey` to a third-party API from the browser.
	// Here we just pretend, using a local mock response.
	await new Promise((r) => setTimeout(r, 300));
	const words = text.trim().split(/\s+/).filter(Boolean);
	const keyHint = apiKey.slice(0, 4) + '…';
	return `Mock summary (${words.length} words, key ${keyHint}): ${words.slice(0, 8).join(' ')}…`;
}
