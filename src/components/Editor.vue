<script setup lang="ts">
	import { ink } from "ink-mde";
	import { onMounted } from "vue";

	onMounted(() => {
		ink(document.getElementById("ink-mde")!);
	});
</script>

<template>
	<div>
		<h1>ink-mde</h1>
		<div id="ink-mde"></div>
	</div>
</template>

<style scoped></style>
