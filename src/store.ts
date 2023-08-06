import { reactive } from "vue";
import {
	BaseDirectory,
	FileEntry,
	exists,
	readTextFile,
	removeFile,
	writeTextFile,
} from "@tauri-apps/api/fs";

const fsOptions = {
	dir: BaseDirectory.Document,
};

export const store = reactive({
	noteEntries: <FileEntry[]>[],
	async updateNotes(newEntries: FileEntry[]) {
		this.noteEntries = newEntries.filter((entry) => {
			return entry.name?.match(/^.+\.md$/);
		});
	},

	currentNote: <string | null>null,
	currentNoteEntry: <FileEntry | null>null,
	async getCurrentNoteContent() {
		return await readTextFile(<string>this.currentNoteEntry?.path, fsOptions);
	},

	getCurrentNotePath() {
		const entry = this.noteEntries.find(
			(entry) => entry.name == this.currentNote
		);
		return entry?.path;
	},

	async deleteCurrentNote() {
		await removeFile(<string>store.currentNoteEntry?.path, fsOptions);
		store.currentNote = null;
		store.currentNoteEntry = null;
	},

	async updateCurrentNoteContent(content: string) {
		const noteEntry = this.noteEntries.find(
			(entry) => entry.name == this.currentNote
		);

		await writeTextFile(<string>noteEntry?.path, content, fsOptions);
	},

	setCurrentNote(filename: string) {
		const noteEntry = this.noteEntries.find((entry) => entry.name == filename);
		this.currentNote = <string>noteEntry?.name;
		this.currentNoteEntry = <FileEntry>noteEntry;
	},

	async createNewNote(filename: string) {
		await writeTextFile(`arkane/${filename}.md`, "", fsOptions);
	},

	async checkNoteExistence(filename: string) {
		if (!filename.length) return false;
		return await exists(`arkane/${filename}.md`, fsOptions);
	},
});
