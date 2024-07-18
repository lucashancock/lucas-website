<!-- src/lib/components/Navbar.svelte -->
<script>
	import { currentPath } from '../../stores/stores';
	import { goto } from '$app/navigation';

	const navigate = (newPath) => {
		currentPath.set(newPath);
		goto(`${$currentPath}`);
	};
</script>

<nav class="bg-black p-4">
	<div class="mx-auto flex justify-between items-center transition-all duration-300">
		<a
			href="/"
			class="font-mono pl-3 text-2xl {$currentPath === '/'
				? 'font-semibold text-green-400'
				: 'font-normal'} text-green-500 hover:text-green-500"
			on:click={(e) => {
				e.preventDefault();
				navigate('/');
			}}>~/Users/luke/projects/lucas-website</a
		>
		<div class="space-x-4">
			<a
				href="/about"
				class="font-mono text-2xl {$currentPath === '/about'
					? 'font-semibold text-green-400'
					: 'font-normal'} text-green-500 hover:text-green-500"
				on:click={(e) => {
					e.preventDefault();
					navigate('/about');
				}}>+/about</a
			>
			<a
				href="/contact"
				class="font-mono text-2xl {$currentPath === '/contact'
					? 'font-semibold text-green-400'
					: 'font-normal'} text-green-500 hover:text-green-500"
				on:click={(e) => {
					e.preventDefault();
					navigate('/contact');
				}}>+/contact</a
			>
			<a
				href="/projects"
				class="font-mono pr-3 text-2xl {$currentPath === '/projects'
					? 'font-bold text-green-400'
					: 'font-normal'} text-green-500 hover:text-green-500"
				on:click={(e) => {
					e.preventDefault();
					navigate('/projects');
				}}>+/projects</a
			>
		</div>
	</div>
</nav>
