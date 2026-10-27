import { redirect } from '@sveltejs/kit';

// The page only needs a signed-in user; the note itself is loaded in the browser
// from GET /api/notes/:id so it shows up in the Network tab.
export function load({ locals, params }) {
	if (!locals.user) redirect(303, '/login');
	return { id: params.id };
}
