<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { appWindow } from "@tauri-apps/api/window";
	import { getName } from "@tauri-apps/api/app";
	import arkaneLogo from "../arkane.svg";

	const title = ref("");

	onMounted(async () => {
		title.value = await getName();
	});
</script>

<template>
	<div id="TitleBar">
		<img data-tauri-drag-region :src="arkaneLogo" />

		<h1 data-tauri-drag-region>{{ title }}</h1>

		<div id="win-btns">
			<button id="win-btn-1" @click="appWindow.minimize">_</button>
			<button id="win-btn-2" @click="appWindow.toggleMaximize">[ ]</button>
			<button id="win-btn-3" @click="appWindow.close">x</button>
		</div>
	</div>
</template>

<style scoped>
	#TitleBar {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid grey;

		position: relative;
	}

	img {
		position: absolute;
		height: 24px;
		top: 50%;
		transform: translateY(-50%);
		left: 0.25rem;
		filter: drop-shadow(0px 0px 2px black);
	}

	h1 {
		flex-grow: 1;
		font-size: 16px;
		margin: 0;
		font-weight: normal;
		align-self: center;
		text-align: center;

		display: grid;
		place-content: center;
		height: 100%;
	}

	#win-btns {
		position: absolute;
		right: 0;
		height: 100%;
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
