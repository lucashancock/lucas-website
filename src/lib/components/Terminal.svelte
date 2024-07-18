<!-- src/lib/components/Terminal.svelte -->
<script>
	// import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let input = '';
	let output = writable([]);
	let currentPath = writable('/');

	// Define the structure of your website as a file system
	// const fileSystem = {
	// 	'/': ['about', 'contact', 'projects'],
	// 	'/about': ['me', 'work', 'school', 'interests'],
	// 	'/contact': ['e-mail', 'sendable-form'],
	// 	'/projects': ['Project 1', 'Project 2'] // TO-DO: get projects from projects json data and load here dynamically.
	// };

	const commands = {
		ls: () => {
			// TO-DO: Implement ls functionality
			console.log('Current path: ' + $currentPath);
			console.log('Command: ' + input);
			return 'ls finished';
		},
		cd: () => {
			// TO-DO: Implement cd functionality
			console.log('Current path: ' + $currentPath);
			console.log('Command: ' + input);
			return 'cd finished';
		},
		clear: () => {
			// TO-DO: Implement clear functionality. Have it just clear the outputs array.
			// Also potentially make it so that the outputs array can only hold a certain number of values.
			return 'clear finished';
		}
	};

	const handleCommand = () => {
		let [cmd, ...args] = input.split(' ');
		cmd = cmd.toLowerCase();
		let result = '';

		if (cmd === 'ls') {
			console.log('ls command recognized in handleCommand');
			console.log('If any args were provided, they are this: ' + args);
			console.log('Calling the command...');
			result = commands.ls();
		} else if (cmd === 'cd') {
			console.log('cd command recognized in handleCommand');
			console.log('If any args were provided, they are this: ' + args);
			console.log('Calling the command...');
			result = commands.cd();
		} else if (cmd === 'clear') {
			result = commands.clear();
		}

		if (result) {
			console.log('Pushing result: ' + result + ' onto the stack.');
			$output = [...$output, `> ${input} : ${result}`];
			console.log('Output: ' + $output);
		}
		input = ''; // reset the input back to empty string
	};
</script>

<div class="bg-black text-green-700 p-4 font-mono">
	<div>
		{#each $output as line}
			<div>{line}</div>
		{/each}
	</div>
	<div>
		<span>{$currentPath} $</span>
		<input
			class="border-none bg-inherit text-inherit outline-none"
			type="text"
			bind:value={input}
			on:keydown={(e) => e.key === 'Enter' && handleCommand()}
		/>
	</div>
</div>
