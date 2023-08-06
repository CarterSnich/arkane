<script setup lang="ts">
	import TitleBar from "./components/TitleBar.vue";
	import EditorArea from "./components/EditorArea.vue";
	import Sidebar from "./components/Sidebar.vue";
	import { appWindow } from "@tauri-apps/api/window";
	import { ref, watch, type Ref } from "vue";
	import { store } from "./store";

	const isMaximized: Ref<(() => Promise<boolean>) | null> = ref(null);

	appWindow.onResized(async () => {
		isMaximized.value =
			(await appWindow.isMaximized()) as unknown as () => Promise<boolean>;
	});

	watch(
		() => store.currentNote,
		async () => {
			await appWindow.setTitle(store.currentNote || "arkane");
		}
	);
</script>

<template>
	<main :class="{ maximized: isMaximized }">
		<TitleBar />
		<div id="main">
			<Sidebar />
			<EditorArea />
		</div>
	</main>
</template>

<style scoped>
	main {
		height: 100vh;

		display: grid;
		grid-template-rows: 28px auto;
		overflow: hidden;

		background-color: var(--background-body);
		border: 2px solid grey;
		border-radius: 0.3rem;
	}

	main.maximized {
		border: 0;
		border-radius: 0;
	}

	#main {
		display: grid;
		grid-template-columns: min-content auto;
		overflow: hidden;
	}
</style>
