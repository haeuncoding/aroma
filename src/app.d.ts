// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session } from 'svelte-kit-cookie-session';

type SessionData = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_time: Date;
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session<SessionData>;
		}
		interface PageData {
			session: SessionData;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
