import { redirect } from '@sveltejs/kit';
import { listNotesByOwner } from '$lib/server/db.js';

export function load({ locals }) {
	if (!locals.user) redirect(303, '/login');
	return { notes: listNotesByOwner(locals.user.id) };
}
