<!-- src/lib/components/Terminal.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { output } from '../../stores/stores';
	import { currentPath } from '../../stores/stores';

	let input = '';

	// Define the structure of the website as a file system
	const fileSystem = new Map([
		['/', ['about', 'contact', 'projects']],
		['/about', ['me.txt', 'work.txt', 'school.txt', 'interests.txt']],
		['/contact', ['e-mail.txt', 'sendable-form.txt']],
		['/projects', ['Project 1.txt', 'Project 2.txt']]
	]);
	const commands = {
		ls: () => {
			let files = fileSystem.get($currentPath);
			let output = '';
			if (!files) throw new Error('files non existent');
			files.forEach((file) => {
				output += file + ' ';
			});
			return output;
		},
		pwd: (args: string[]) => {
			if (args.length != 0) return 'pwd: too many arguments';
			else return $currentPath;
		},
		cd: (args: string[]) => {
			if (args.length != 1) return 'cd: invalid number of arguments';
			const targetDir = args[0];
			let files = fileSystem.get($currentPath);
			if (!files) return 'cd: files not found. try reloading';

			if (targetDir === '..') {
				if ($currentPath === '/') return 'cd: invalid command';
				let path = $currentPath;
				path = path.split('/').slice(0, -1).join('/') || '/';
				currentPath.set(path);
				goto(`${$currentPath}`);
			} else if (!files.includes(targetDir) || targetDir.endsWith('.txt')) {
				return 'cd: directory does not exist';
			} else {
				currentPath.set($currentPath + targetDir);
				goto(`${$currentPath}`);
			}
			return '';
		},
		cat: (args: string[]) => {
			if (args.length != 1) return 'cat: invalid number of arguments';
			const file = args[0];
			const files = fileSystem.get($currentPath);
			if (!files) return 'cat: files not found. try reloading';
			if (file.endsWith('.txt') && files.includes(file)) {
				const fileName = file.replace('.txt', '');
				goto(`${$currentPath}/${fileName}`);

				return 'cat: file found';
			} else {
				return 'cat: file not found';
			}
		},
		clear: () => {
			// $output.length = 0;
			output.clear();
		},
		help: () => {
			return 'commands: pwd, ls, cd, clear, cat, help.';
		},
		other: () => {
			return 'command not recognized. try `help` for a list of commands.';
		}
	};

	const handleCommand = () => {
		let [cmd, ...args] = input.split(' ');
		cmd = cmd.toLowerCase();
		let result = '';

		if (cmd === 'ls') {
			result = commands.ls();
		} else if (cmd === 'cd') {
			result = commands.cd(args);
		} else if (cmd === 'clear') {
			commands.clear();
		} else if (cmd === 'pwd') {
			result = commands.pwd(args);
		} else if (cmd === 'help') {
			result = commands.help();
		} else if (cmd === 'cat') {
			result = commands.cat(args);
		} else {
			result = commands.other();
		}
		if (result) {
			// $output = [...$output, `${result}`];
			output.add(`${result}`);
		}

		input = ''; // reset the input back to empty string
	};
</script>

<div class="w-full outline outline-green-800"></div>
<div
	class="bg-black text-green-500 text-xl p-4 outline outline-green-500 font-mono overscroll-none overflow-y-hidden"
>
	<div class="flex">
		<div class="mb-3 text-2xl py-1 underline underline-offset-8 w-full">mini-term-emu</div>
	</div>
	{#if $output.length == 0}
		<div class="font-semibold">type 'help' for a list of commands</div>{/if}
	<div>
		{#each $output as line}
			<div class="flex justify-between">
				<div>{line[0]}</div>
				<!-- Check if command failed or not and display check or x -->
				{#if line[0]}
					<div>&checkmark; @ {line[1]}</div>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex">
		<span class="flex-initial">{$currentPath} $:</span>

		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="pl-3 text-xl flex-grow bg-inherit text-inherit outline-none block-cursor"
			type="text"
			bind:value={input}
			on:keydown={(e) => e.key === 'Enter' && handleCommand()}
			autofocus
		/>
	</div>
</div>
