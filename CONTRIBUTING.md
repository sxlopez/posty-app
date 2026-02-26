# Contributing

Thanks for contributing! This project uses simple Markdown posts stored in the `posts/` folder.

Guidelines for adding a new post

- Create a new Markdown file under `posts/` with a short, URL-friendly filename, e.g. `my-first-post.md`.
- The first line must be the post title as an H1 (a single `# Title` line). The app uses that first line as the title.
- Leave a blank line after the title, then write the post body in Markdown. The app supports standard Markdown including lists, code blocks, and images.
- Images should be placed in `public/` and referenced with relative paths like `/images/my.png`.

Example post start:

```
# My Post Title

This is the first paragraph of the post.

```js
console.log('code block');
```
```

Workflow

1. Create a branch named like `yourname/add-post-title`.
2. Add your post file to `posts/` and run the app locally to preview:

```bash
npm install
npm start
# open http://localhost:3000
```

3. Commit your change and push the branch, then open a pull request against the repository's default branch.
4. In your PR description, include a short summary and the path to your new file.

PR & review notes

- Keep changes limited to just the new post (or a small, related fix) so reviews are quick.
- Maintain consistent formatting and use Markdown headings and code fences.
- If your change touches other parts of the site, describe the reason in the PR.

Code of conduct

Please follow the repository's code of conduct (if present) and be respectful in PR discussions.

Thanks — we appreciate your contributions!
