import { error, redirect } from '@sveltejs/kit';

// The admin PAGE is protected correctly; the weakness is in the API it calls.
export function load({ locals }) {
	if (!locals.user) redirect(303, '/login');
	if (locals.user.role !== 'admin') error(403, 'Administrators only.');
}
