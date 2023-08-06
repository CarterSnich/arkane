<script setup lang="ts">
	import EasyMDE from "easymde";
	import { onMounted } from "vue";

	let easyMDE: EasyMDE;

	onMounted(() => {
		easyMDE = new EasyMDE({
			element: <HTMLElement>document.getElementById("easymde"),
			status: false,
			styleSelectedText: false,
		});
	});
</script>

<template>
	<div id="EditorArea">
		<textarea id="easymde"></textarea>
	</div>
</template>

<style scoped>
	@import "https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css";

	div {
		background-color: wheat;
	}
</style>
