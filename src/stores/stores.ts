import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

function createLimitedArrayStore(initialArray = [], maxLength = 5) {
	const { subscribe, set, update } = writable(initialArray);

	const add = (item) => {
		update((arr) => {
			const newArray = [...arr, [item, new Date().toLocaleTimeString()]];
			if (newArray.length > maxLength) {
				newArray.shift(); // Remove the oldest item
			}
			return newArray;
		});
	};

	const clear = () => set([]);

	return {
		subscribe,
		add,
		clear,
		set
	};
}

export const output = createLimitedArrayStore([], 5);
export const currentPath: Writable<string> = writable('/');
