import { json } from '@sveltejs/kit';
import { requireLogin } from '$lib/server/auth.js';
import { listUsers } from '$lib/server/db.js';

export function GET({ locals }) {
	requireLogin(locals);
	// DEFECT 3 (instructor): no check that locals.user.role === 'admin'
	// Passwords are deliberately NOT returned.
	return json(listUsers().map(({ id, name, email, role }) => ({ id, name, email, role })));
}
