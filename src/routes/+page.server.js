import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	redirect(303, locals.user ? '/notes' : '/login');
}
