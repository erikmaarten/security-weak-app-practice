// In-memory store. Restarting the server or calling reset() restores this data.

const initialUsers = () => [
	{ id: 1, name: 'Alice Example', email: 'alice@example.test', password: 'alice123', role: 'user' },
	{ id: 2, name: 'Bob Example', email: 'bob@example.test', password: 'bob123', role: 'user' },
	{ id: 3, name: 'Admin Example', email: 'admin@example.test', password: 'admin123', role: 'admin' }
];

const initialNotes = () => [
	{
		id: 101,
		ownerId: 1,
		title: 'Alice’s campaign ideas',
		body: 'Campaign ideas from Alice for the spring launch. Slogan drafts and poster concepts.'
	},
	{
		id: 102,
		ownerId: 2,
		title: 'Bob’s interview notes',
		body: 'Interview notes for the spring campaign. Draft questions and answers.'
	}
];

// Keep one store across dev-server module reloads.
const store = (globalThis.__notesLabStore ??= {
	users: initialUsers(),
	notes: initialNotes(),
	sessions: new Map() // token -> userId
});

export function resetData() {
	store.users = initialUsers();
	store.notes = initialNotes();
}

export const findUserByEmail = (email) => store.users.find((u) => u.email === email);
export const findUserById = (id) => store.users.find((u) => u.id === id);
export const listUsers = () => store.users;
export const findNote = (id) => store.notes.find((n) => n.id === id);
export const listNotesByOwner = (ownerId) => store.notes.filter((n) => n.ownerId === ownerId);
export const sessions = store.sessions;
