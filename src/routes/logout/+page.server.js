import { redirect } from '@sveltejs/kit';
import { sessions } from '$lib/server/db.js';

export const actions = {
	default: async ({ cookies }) => {
		const token = cookies.get('session');
		if (token) sessions.delete(token);
		cookies.delete('session', { path: '/' });
		redirect(303, '/login');
	}
};
