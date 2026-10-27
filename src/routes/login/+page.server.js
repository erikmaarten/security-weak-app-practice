import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { findUserByEmail, sessions } from '$lib/server/db.js';

export function load({ locals }) {
	if (locals.user) redirect(303, '/notes');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();
		const password = String(form.get('password') ?? '');
		const user = findUserByEmail(email);
		if (!user || user.password !== password) {
			return fail(400, { email, error: 'Wrong email or password.' });
		}
		const token = randomUUID();
		sessions.set(token, user.id);
		cookies.set('session', token, { path: '/', httpOnly: true, sameSite: 'lax' });
		redirect(303, '/notes');
	}
};
