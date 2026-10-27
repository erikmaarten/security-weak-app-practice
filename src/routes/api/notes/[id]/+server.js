import { error, json } from '@sveltejs/kit';
import { requireLogin } from '$lib/server/auth.js';
import { findNote } from '$lib/server/db.js';

export function GET({ locals, params }) {
	requireLogin(locals);
	const note = findNote(Number(params.id));
	if (!note) error(404, 'Note not found.');
	// DEFECT 1 (instructor): signed in, but no check that note.ownerId === user.id
	return json(note);
}

export async function PUT({ locals, params, request }) {
	requireLogin(locals);
	const note = findNote(Number(params.id));
	if (!note) error(404, 'Note not found.');
	// DEFECT 2 (instructor): signed in, but no ownership check before updating

	let payload;
	try {
		payload = await request.json();
	} catch {
		error(400, 'Request body must be JSON.');
	}
	if (typeof payload?.title !== 'string' || typeof payload?.body !== 'string') {
		error(400, 'Both "title" and "body" must be strings.');
	}
	note.title = payload.title.slice(0, 200);
	note.body = payload.body.slice(0, 5000);
	return json(note);
}
