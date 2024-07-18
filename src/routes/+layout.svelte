<script>
	import '../lib/styles/global.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import Terminal from '../lib/components/Terminal.svelte';
</script>

<div class="flex flex-col h-screen">
	<div class="flex-shrink-0">
		<Navbar />
	</div>

	<div class="flex-grow overflow-auto">
		<slot />
	</div>

	<div class="flex-shrink-0 max-h-[30vh] overflow-y-auto">
		<Terminal />
	</div>
</div>
