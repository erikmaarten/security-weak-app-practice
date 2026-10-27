import { sessions, findUserById } from '$lib/server/db.js';

/** Look up the signed-in user (if any) from the session cookie. */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');
	const userId = token ? sessions.get(token) : undefined;
	event.locals.user = userId ? findUserById(userId) : null;
	return resolve(event);
}
