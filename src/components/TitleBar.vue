<script setup lang="ts">
	import { appWindow } from "@tauri-apps/api/window";
	import arkaneIcon from "../arkane.svg";
	import { store } from "../store";
</script>

<template>
	<div id="TitleBar">
		<img id="win-icon" data-tauri-drag-region :src="arkaneIcon" />
		<h1 id="win-title" data-tauri-drag-region>
			{{ store.currentNote || "arkane" }}
		</h1>
		<div id="win-btns">
			<button class="custom-btn">🌙</button>
			<button class="custom-btn" @click="appWindow.minimize">_</button>
			<button class="custom-btn" @click="appWindow.toggleMaximize">[ ]</button>
			<button class="custom-btn" @click="appWindow.close">&Cross;</button>
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

	#win-icon {
		position: absolute;
		height: 24px;
		top: 50%;
		transform: translateY(-50%);
		left: 0.25rem;
		filter: drop-shadow(0px 0px 2px black);
	}

	#win-title {
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
		color: inherit;
		font-family: monospace;
		white-space: nowrap;
		height: 100%;
		width: 42px;
		border: 0;
		background-color: transparent;
		transition: all 0.3s ease-in-out;
	}

	#win-btns > button:hover {
		filter: brightness(80%);
		background-color: var(--button-hover);
	}

	#win-btns > button:last-child:hover {
		background-color: red !important;
		filter: brightness(80%);
	}
</style>
