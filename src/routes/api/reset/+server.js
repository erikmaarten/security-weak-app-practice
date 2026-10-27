import { json } from '@sveltejs/kit';
import { resetData } from '$lib/server/db.js';

// Classroom convenience: restores the original users, notes and defects.
// Intentionally unauthenticated so students can always recover.
export function POST() {
	resetData();
	return json({ ok: true });
}
