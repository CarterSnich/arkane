<script setup lang="ts">
	import TitleBar from "./components/TitleBar.vue";
	import EditorArea from "./components/EditorArea.vue";
	import Sidebar from "./components/Sidebar.vue";
	import { appWindow } from "@tauri-apps/api/window";
	import { ref, type Ref } from "vue";
	import Note from "./Note";

	const notes: Ref<Note[]> = ref([]);
	const currentEditingFile: Ref<Note | null> = ref(null);
	const isMaximized: Ref<(() => Promise<boolean>) | null> = ref(null);

	appWindow.onResized(async () => {
		isMaximized.value =
			(await appWindow.isMaximized()) as unknown as () => Promise<boolean>;
	});

	notes.value = [
		{
			id: 0,
			filename: "Markdown Guide.md",
			content: `# A first-level heading
## A second-level heading
### A third-level heading

**This is bold text**
_This text is italicized_
~~This was mistaken text~~
**This text is _extremely_ important**
***All this text is important***
This is a <sub>subscript</sub> text
This is a <sup>superscript</sup> text

Text that is not a quote

> Text that is a quote

Use \`git status\` to list all new or modified files that haven't yet been committed.

Some basic Git commands are:
\`\`\`sh
git status
git add
git commit
\`\`\`
This site was built using [GitHub Pages](https://pages.github.com/).

1. Nested list
   - a
     - a.a
     - a.b
   - b
     - b.a
     - b.b
2. Item 2
    
- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.`,
			isOpen: false,
		},
		{
			id: 1,
			filename: "Note 1.md",
			content: "Hello, Note 1",
			isOpen: false,
		},
		{
			id: 2,
			filename: "Note 2.md",
			content: "Hello, Note 2",
			isOpen: false,
		},
		{
			id: 3,
			filename: "Note 3.md",
			content: "Hello, Note 3",
			isOpen: false,
		},
		{
			id: 4,
			filename: "Note 4.md",
			content: "Hello, Note 4",
			isOpen: false,
		},
		{
			id: 5,
			filename: "Note 5.md",
			content: "Hello, Note 5",
			isOpen: false,
		},
	];

	const setCurrentEditingFile = (noteId: number) => {
		const currentNotes = notes.value;
		currentNotes[noteId].isOpen = true;
		currentEditingFile.value = currentNotes[noteId];
		notes.value = currentNotes;
	};
</script>

<template>
	<div id="main" :class="{ maximized: isMaximized }">
		<TitleBar />
		<main>
			<Sidebar :notes="notes" :setCurrentEditingFile="setCurrentEditingFile" />
			<EditorArea
				:notes="notes"
				:currentEditingFile="() => currentEditingFile"
			/>
		</main>
	</div>
</template>

<style scoped>
	#main {
		color: #0f0f0f;
		background-color: #f6f6f6;
		height: 100vh;

		display: grid;
		grid-template-rows: 28px auto;
		border: 2px solid grey;
		border-radius: 0.3rem;
		overflow: hidden;
	}

	#main.maximized {
		border: 0;
		border-radius: 0;
	}

	main {
		display: grid;
		grid-template-columns: min-content auto;
		overflow: hidden;
	}
</style>
