import { error } from '@sveltejs/kit';

/** Throws 401 unless someone is signed in. Returns the user. */
export function requireLogin(locals) {
	if (!locals.user) error(401, 'You must sign in first.');
	return locals.user;
}
