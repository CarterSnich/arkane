<script setup lang="ts">
	import EasyMDE from "easymde";
	import { onMounted, watch } from "vue";
	import { store } from "../store";
	import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
	import { watch as fsWatch } from "tauri-plugin-fs-watch-api";
	import { UnlistenFn } from "@tauri-apps/api/event";

	let easyMDE: EasyMDE | undefined;
	let stopSaveTimeout: number | null = null;
	let stopFileWatcher: UnlistenFn | null = null;

	const fileWatcher = async () => {
		const content = await readTextFile(<string>store.currentNoteEntry?.path, {
			dir: BaseDirectory.Document,
		});
		easyMDE?.value(content);
	};

	onMounted(async () => {
		easyMDE = new EasyMDE({
			element: <HTMLElement>document.getElementById("easymde"),
			status: false,
			autoRefresh: { delay: 300 },
			maxHeight: "100%",
			spellChecker: false,
			previewImagesInEditor: true,
			uploadImage: true,
			toolbar: [
				"bold",
				"italic",
				"heading",
				"|",
				"quote",
				"unordered-list",
				"ordered-list",
				"|",
				"link",
				"image",
				"|",
				"preview",
				{
					name: "custom",
					action: async (_editor) => {
						await store.deleteCurrentNote();
					},
					className: "fa fa-trash",
					title: "Delete Note",
				},
				"|",
				{
					name: "guide",
					action: "https://www.markdownguide.org/basic-syntax/",
					className: "fa fa-question-circle",
					title: "Guide",
					attributes: {
						target: "_blank",
					},
				},
			],
		});

		easyMDE?.codemirror.on("keypress", async () => {
			if (stopSaveTimeout != null) {
				clearTimeout(stopSaveTimeout);
				stopSaveTimeout = null;
				console.log("Pending save cleared.");
			}

			stopSaveTimeout = setTimeout(async () => {
				if (stopFileWatcher != null) {
					stopFileWatcher();
				}

				await store.updateCurrentNoteContent(<string>easyMDE?.value());
				stopSaveTimeout = null;
				console.log("Note saved");

				stopFileWatcher = await fsWatch(
					<string>store.currentNoteEntry?.path,
					fileWatcher
				);
			}, 1000);
		});
	});

	watch(
		() => store.currentNote,
		async () => {
			if (stopSaveTimeout != null) {
				clearTimeout(stopSaveTimeout);
				stopSaveTimeout = null;
			}

			const path = <string>store.currentNoteEntry?.path;
			const content = await readTextFile(path, {
				dir: BaseDirectory.Document,
			});
			easyMDE?.value(content);

			if (stopFileWatcher != null) {
				stopFileWatcher();
			}

			stopFileWatcher = await fsWatch(<string>path, fileWatcher);
		},
		{ immediate: true }
	);
</script>

<template>
	<div id="Editor">
		<div v-if="false" id="toolbar">
			<button title="Bold (Ctrl+B)" aria-label="tb-bold">
				<b>B</b>
			</button>
			<button title="Italic (Ctrl+I)" aria-label="tb-italic"><i>I</i></button>
			<button title="Heading (Ctrl+H)" aria-label="tb-heading"><b>H</b></button>
			<div aria-label="tb-separator">|</div>

			<!--  -->
			<button title="Qoute (Ctrl+')" aria-label="tb-qoute">
				<b>&quot;</b>
			</button>
			<button title="Generic List (Ctrl+L)" aria-label="tb-ulist">
				<b>&</b>
			</button>
			<button title="Numbered List (Ctrl+Alt+L)" aria-label="tb-olist">
				<b>&</b>
			</button>
			<div aria-label="tb-separator">|</div>

			<!--  -->
			<button title="Create Link (Ctrl+K)" aria-label="tb-link">
				<b>&</b>
			</button>
			<button title="Insert Image (Ctrl+Alt+I)" aria-label="tb-image">
				<b>&</b>
			</button>
			<div aria-label="tb-separator">|</div>

			<!--  -->
			<button title="Toggle Preview (Ctrl+P)" aria-label="tb-preview">
				👁️
			</button>
			<button title="Delete Note (Ctrl+D)" aria-label="tb-delete">🗑️</button>
			<div aria-label="tb-separator">|</div>
		</div>
		<div id="mde-wrapper">
			<textarea id="easymde"></textarea>
		</div>
	</div>
</template>

<style scoped>
	#Editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#toolbar {
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 1;

		display: flex;
		padding: 0.5rem 0.75rem;
		gap: 0.5rem;
		background-color: var(--background-body);
	}

	#toolbar > button {
		border: 0;
		border-radius: 0.25rem;
		padding: 2px 6px 3px 6px;
		font-size: small;
		font-family: monospace;
		width: 32px;
		margin: 0;
	}

	#mde-wrapper {
		flex: 1;
		display: block;
		overflow: hidden;
	}
</style>

<!-- easymde custom styling -->
<style>
	@import url(../../node_modules/easymde/dist/easymde.min.css);

	.EasyMDEContainer {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		height: 100%;
	}

	.EasyMDEContainer > .editor-toolbar {
		border: 0;
	}

	.EasyMDEContainer > .editor-toolbar > button.active {
		background-color: var(--button-base);
	}

	.EasyMDEContainer > .editor-toolbar > button:hover {
		background-color: transparent;
	}

	.CodeMirror-wrap {
		background-color: var(--background-body);
		color: var(--text-main);
		border: none !important;
		height: 100% !important;
		overflow: hidden;
		display: block;
	}
	.CodeMirror * {
		background-color: var(--background-body) !important;
		-webkit-user-select: text !important;
		user-select: text !important;
		cursor: text !important;
	}

	.CodeMirror-cursor {
		border-color: var(--text-main);
	}

	.CodeMirror-code {
		background-color: transparent !important;
	}

	.CodeMirror-selectedtext {
		background-color: var(--selection) !important;
	}

	.editor-preview-full::selection,
	.editor-preview-full ::selection {
		background-color: var(--selection) !important;
	}

	.editor-preview-full code {
		background-color: var(--background) !important;
	}
	.editor-preview-full a,
	.editor-preview-full input:not([type="checkbox"]) {
		cursor: pointer !important;
	}

	.editor-preview-full input[type="checkbox"]:active {
		transform: none !important;
	}
</style>
