<script>
	import '../lib/styles/global.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import Terminal from '../lib/components/Terminal.svelte';
</script>

<Navbar />

<div class="m-1 outline-dashed outline-blue-500">
	<!-- <h1 class="text-teal-500">This is the main layout!</h1> -->
	<slot />
</div>

<Terminal />
