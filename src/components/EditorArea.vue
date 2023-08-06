<script setup lang="ts">
	import Editor from "./Editor.vue";
	import { store } from "../store";

	const haikus = [
		"Open a note or create a new note",
		"In the notebook's realm, open a page or birth a tale anew",
		"Amidst blank pages, whispers of wisdom await their birth",
		"A note's embrace holds seeds of thoughts, ready to bloom",
		"Through ink's dance, ideas take flight and dreams unfurl",
		"Inscribing words, a symphony of thoughts finds harmony",
		"In parchment's embrace, tales and musings find their home",
		"An empty note, a canvas for the soul's masterpiece",
		"Within the pages lie keys to unlock hidden truths",
		"A single note, a ripple in the vast ocean of knowledge",
		"With pen in hand, the journey of creation begins",
		"In the stillness of paper, whispers of inspiration arise",
		"In notes, memories are etched, a timeless legacy",
		"In the universe of thoughts, a note is a guiding star",
		"Within the lines, untold stories find their voice",
		"From the heart's inkwell, emotions paint their portrait",
		"In a note's grace, the present immortalizes itself",
		"Through words, a note becomes a vessel of introspection",
		"Each note a lantern, illuminating the path ahead",
		"In a world of notes, curiosity finds its compass",
		"Through the pen's dance, life's tapestry takes shape",
	];
</script>

<template>
	<div id="EditorArea">
		<Editor v-if="store.currentNote" />
		<div id="empty-editor" v-else>
			{{ haikus[Math.floor(Math.random() * haikus.length)] }}
		</div>
	</div>
</template>

<style scoped>
	#EditorArea {
		overflow: hidden;
	}

	#empty-editor {
		display: grid;
		place-content: center;
		height: 100%;
		position: relative;
		text-align: center;
		padding: 3.25rem;
	}
</style>
