<script setup lang="ts">
	import TitleBar from "./components/TitleBar.vue";
	import EditorArea from "./components/EditorArea.vue";
	import Sidebar from "./components/Sidebar.vue";
</script>

<template>
	<div id="main">
		<TitleBar id="TitleBar" />
		<main>
			<Sidebar id="SideBar" />
			<EditorArea id="EditorArea" />
		</main>
	</div>
</template>

<style scoped>
	#main {
		height: 100vh;

		display: grid;
		grid-template-rows: 28px auto;
	}
</style>
