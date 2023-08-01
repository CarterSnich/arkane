<script setup lang="ts">
	import type Note from "../Note";

	const props = defineProps<{
		notes: Note[];
		setCurrentEditingFile: Function;
	}>();

	const { notes, setCurrentEditingFile } = props;
</script>

<template>
	<div id="Sidebar">
		<span>Notes</span>
		<ul id="note-list">
			<li v-for="note in notes" :key="note.id">
				<a
					href="#"
					@click="() => setCurrentEditingFile(note.id)"
					:class="{ open: note.isOpen }"
				>
					{{ note.filename }}
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	#Sidebar {
		min-width: 256px;
		border-right: 1px solid grey;

		display: flex;
		flex-direction: column;
	}

	span {
		border-bottom: 1px solid grey;
		padding: 0.25rem;
		text-transform: uppercase;
	}

	#note-list {
		display: flex;
		flex-direction: column;

		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	#note-list > li {
		flex-grow: 1;
	}

	#note-list > li > a {
		display: block;
		width: 100%;
		padding: 0.15rem 0.5rem;
		text-decoration: none;
		color: inherit;
	}

	#note-list > li > a.open {
		color: red;
	}

	#note-list > li > a:hover {
		background-color: grey;
		backdrop-filter: brightness(80%);
	}
</style>
