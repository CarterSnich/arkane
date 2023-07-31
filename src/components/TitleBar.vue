<script setup lang="ts">
	import { ref } from "vue";
	import { appWindow } from "@tauri-apps/api/window";

	const title = ref("notedown");

	const minimize = async () => await appWindow.minimize();
</script>

<template>
	<div class="container">
		<h1>{{ title }}</h1>

		<div id="win-btns">
			<button id="win-btn-1" @click="minimize">_</button>
			<button id="win-btn-2">[ ]</button>
			<button id="win-btn-3">x</button>
		</div>
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid grey;
	}

	h1 {
		flex-grow: 1;
		font-size: 16px;
		margin: 0;
		font-weight: normal;
		align-self: center;
		text-align: center;
	}

	#win-btns > button {
		font-family: monospace;
		height: 100%;
		width: 42px;
		border: 0;
		background-color: transparent;
		transition: all 0.3s ease-in-out;
	}

	#win-btn-1:hover,
	#win-btn-2:hover {
		filter: brightness(80%);
		background-color: grey;
	}

	#win-btn-3:hover {
		background-color: red !important;
		filter: brightness(80%);
	}
</style>
