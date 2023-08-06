<script setup lang="ts">
	import { nextTick, ref, watch } from "vue";
	import { store } from "../store";

	const isNewFile = ref(false);
	const newFileName = ref("");
	const fileNameExist = ref(false);

	watch(
		isNewFile,
		async () => {
			if (isNewFile) {
				await nextTick();
				console.log(document.getElementById("new-file-input"));
				document.getElementById("new-file-input")?.focus();
			} else {
				newFileName.value = "";
			}
		},
		{
			immediate: false,
		}
	);

	watch(newFileName, async (filename) => {
		fileNameExist.value = await store.checkNoteExistence(filename);
	});
</script>

<template>
	<div id="Sidebar">
		<span>
			<small>Notes</small>
			<button
				id="add-note-btn"
				class="custom-btn no-transition"
				@click="isNewFile = !isNewFile"
			>
				+
			</button>
		</span>
		<ul id="note-list">
			<li id="new-file" v-show="isNewFile">
				<form
					id="new-file-form"
					style="display: none"
					@submit="
						(e) => {
							e.preventDefault();
							if (fileNameExist) return false;
							store.createNewNote(newFileName);
							newFileName = '';
							isNewFile = false;
						}
					"
				></form>
				<input
					id="new-file-input"
					type="text"
					v-model="newFileName"
					form="new-file-form"
					:class="{ error: fileNameExist }"
					@blur="
						() => {
							newFileName = '';
							isNewFile = false;
						}
					"
				/>
			</li>
			<li
				v-for="entry in store.noteEntries"
				:key="entry.name"
				:class="{ open: entry.name == store.currentNote }"
			>
				<span @click="store.setCurrentNote(<string>entry.name)">
					{{ entry.name?.replace(".md", "") }}
				</span>
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
		resize: horizontal;
	}

	#Sidebar > span {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 0.25rem;

		border-bottom: 1px solid grey;
	}

	#Sidebar > span > small {
		text-transform: uppercase;
	}

	#add-note-btn {
		border: 0;
		background-color: transparent;
		color: inherit;
	}

	#add-note-btn:hover {
		background-color: var(--button-hover);
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
		padding: 2px;
	}

	#note-list > li > span {
		display: block;
		width: 100%;
		padding: 0.25rem 0.5rem;
		text-decoration: none;
		color: inherit;
	}

	#note-list > li.open,
	#note-list > li.open > span {
		background-color: var(--background-alt);
	}

	#note-list > li:hover,
	#note-list > li:hover > span {
		background-color: var(--button-hover);
	}

	#new-file {
		position: relative;
	}

	#new-file-input {
		padding: 0.25rem 0.5rem;
		width: 100%;
		border-radius: 0;
		box-sizing: border-box;
		margin-bottom: 0;
	}

	#new-file-input.error {
		background-color: #271616;
	}
</style>
