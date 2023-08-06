import { createApp } from "vue";
import "./water.css";
import "./styles.css";
import App from "./App.vue";
import { watch } from "tauri-plugin-fs-watch-api";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import { store } from "./store";

const fileWatcher = async () => {
	const entries = await readDir("arkane/", {
		dir: BaseDirectory.Document,
		recursive: true,
	});
	store.updateNotes(entries);
};

(async () => {
	await fileWatcher();
	watch(`${await homeDir()}/Documents/arkane/`, fileWatcher, {
		recursive: true,
	});
})();

createApp(App).mount("#app");
