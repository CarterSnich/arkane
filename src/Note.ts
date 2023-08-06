type Note = {
	path: string;
	content: string;
};

type NoteMapItem = [string, Note];

const sampleNotes: Note[] = [
	{
		path: "Markdown Guide.md",
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
  - a
    - a.a
    - a.b
  - b
    - b.a
    - b.b

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
This is a second line.`,
	},
	{
		path: "Note 1.md",
		content: "Hello, Note 1",
	},
	{
		path: "Note 2.md",
		content: "Hello, Note 2",
	},
	{
		path: "Note 3.md",
		content: "Hello, Note 3",
	},
	{
		path: "Note 4.md",
		content: "Hello, Note 4",
	},
	{
		path: "Note 5.md",
		content: "Hello, Note 5",
	},
];

export type { Note, NoteMapItem };
export { sampleNotes };
