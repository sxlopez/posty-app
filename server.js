const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;
const postsDir = path.join(__dirname, 'posts');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

function slugify(str) {
  return str
    .toString()
    .normalize('NFKD')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase();
}

function readPost(slug) {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  return raw;
}

app.get('/', (req, res) => {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = files.map(f => {
    const slug = path.basename(f, '.md');
    const raw = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const titleMatch = raw.split('\n')[0] || '';
    const title = titleMatch.replace(/^#\s?/, '') || slug;
    const firstPara = raw.split('\n\n')[1] || raw.split('\n\n')[0] || '';
    const excerpt = (firstPara || '').slice(0, 200).replace(/\n/g, ' ');
    return { slug, title, excerpt };
  });
  posts.sort((a,b) => a.title.localeCompare(b.title));
  res.render('index', { posts });
});

app.get('/post/:slug', (req, res) => {
  const slug = req.params.slug;
  const raw = readPost(slug);
  if (!raw) return res.status(404).send('Not found');
  const lines = raw.split('\n');
  const title = lines[0].replace(/^#\s?/, '') || slug;
  const content = marked(raw);
  res.render('post', { title, content });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content required');
  let slug = slugify(title);
  let filename = path.join(postsDir, `${slug}.md`);
  if (fs.existsSync(filename)) {
    slug = `${slug}-${Date.now()}`;
    filename = path.join(postsDir, `${slug}.md`);
  }
  const toWrite = `# ${title}\n\n${content}\n`;
  fs.writeFileSync(filename, toWrite, 'utf8');
  res.redirect(`/post/${slug}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
