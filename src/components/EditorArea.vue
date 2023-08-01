<script setup lang="ts">
	import Editor from "./Editor.vue";
	import { onMounted } from "vue";
	import Note from "../Note";

	const props = defineProps<{
		notes: Note[];
		currentEditingFile: () => Note | null;
	}>();

	onMounted(() => {
		const editorTabs: Element | null = document.getElementById("editor-tabs");

		editorTabs?.addEventListener("wheel", (event) => {
			event.preventDefault();
			editorTabs.scrollLeft += (event as WheelEvent).deltaY;
		});
	});

	const { notes, currentEditingFile } = props;
</script>

<template>
	<div id="EditorArea">
		<nav id="editor-tabs-wrapper">
			<ul id="editor-tabs">
				<li
					v-for="note in notes.filter((notes) => notes.isOpen)"
					:class="{ 'is-current-editing': note.id == currentEditingFile().id }"
				>
					<span>{{ note.filename }}</span>
					<button @click="note.isOpen = false">x</button>
				</li>
			</ul>
		</nav>
		<div id="editor-wrapper">
			<Editor
				v-if="currentEditingFile() != null"
				:note="(currentEditingFile() as Note)"
			/>
			<div v-else id="empty-editor">Open a file</div>
		</div>
	</div>
</template>

<style scoped>
	#EditorArea {
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	#editor-tabs {
		display: flex;
		flex-wrap: nowrap;

		min-height: 32px;
		list-style-type: none;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid grey;
		margin-bottom: -1px;
		margin-right: -1px;
		overflow-x: auto;
		scroll-behavior: smooth;
	}

	#editor-tabs::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#editor-tabs > li {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		min-width: 180px;
		padding: 0.25rem;
		border-width: 0px 1px 1px 0px;
		border-style: solid;
		border-color: grey;
		color: inherit;
		text-decoration: none;
		border-bottom: 1px;
	}

	#editor-tabs > li > button {
		display: none;
		background-color: transparent;
		border: none;
	}

	#editor-tabs > li.is-current-editing > button {
		display: unset;
	}

	#editor-tabs > li > button:hover {
		text-shadow: 0px 0px 4px grey;
	}

	#editor-wrapper {
		height: 100%;
		overflow: hidden;
	}

	#empty-editor {
		display: grid;
		place-content: center;
		height: 100%;
	}
</style>
