<script setup lang="ts">
	import { nextTick, reactive, ref, type Ref } from "vue";
	import InkMde from "ink-mde/vue";
	import { Options } from "ink-mde";
	import showdown from "showdown";
	import Note from "../Note";

	const isPreviewOn: Ref<boolean> = ref(false);
	const options = reactive({
		files: {
			types: ["image/*"],
		},
		interface: {
			appearance: "light",
			attribution: false,
			images: true,
		},
	} as Options);

	const props = defineProps<{
		note: Note;
	}>();

	const converter = new showdown.Converter({
		simpleLineBreaks: true,
	});

	const togglePreview = async () => {
		isPreviewOn.value = !isPreviewOn.value;
		if (isPreviewOn.value) {
			await nextTick(() => {
				document.querySelector("div.cm-scroller > div")?.focus();
			});
		}
	};
</script>

<template>
	<div id="Editor">
		<InkMde
			v-show="isPreviewOn"
			v-model="props.note.content"
			:options="(options as Options)"
		/>
		<div
			id="markdown-preview"
			v-show="!isPreviewOn"
			v-html="converter.makeHtml(props.note.content)"
		></div>

		<button id="toggle-preview" @click="togglePreview">Toggle</button>
	</div>
</template>

<style scoped>
	#Editor {
		height: 100%;
		display: flex;
		justify-content: stretch;
		overflow-y: auto;
	}

	#Editor > div {
		flex: 1;
	}

	:global(.ink.ink-mde) {
		height: 100%;
		border: none;
	}

	:global(.ink.ink-mde *) {
		cursor: text !important;
	}

	:global(.cm-editor) {
		height: 100%;
	}

	:global(.ͼ1.cm-focused) {
		outline: none;
	}

	#markdown-preview {
		padding: 0.5em;
		overflow-y: auto;
	}

	#markdown-preview,
	#markdown-preview :deep(*) {
		-webkit-user-select: text !important;
		user-select: text !important;
		cursor: text !important;
	}

	#toggle-preview {
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
