const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'local_db', 'MailList.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to read subscribers
function readSubscribers() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading MailList.json:', err);
    return [];
  }
}

// Helper to write subscribers
function writeSubscribers(list) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing MailList.json:', err);
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// API Routes
app.get('/api/subscribers', (req, res) => {
  const data = readSubscribers();
  res.json({ output: data, subscribers: data });
});

app.get('/api/maillist', (req, res) => {
  const data = readSubscribers();
  res.json({ output: data, subscribers: data });
});

function handleAddSubscriber(req, res) {
  const { name = '', email, tag = 'Newsletter' } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const list = readSubscribers();
  const existingIndex = list.findIndex(s => s.email && s.email.toLowerCase() === email.trim().toLowerCase());
  
  const now = new Date();
  const joinedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (existingIndex >= 0) {
    list[existingIndex].status = 'active';
    if (name) list[existingIndex].name = name;
    if (tag) list[existingIndex].tag = tag;
    writeSubscribers(list);
    return res.json({ message: 'Subscriber already registered, status set to active', data: list[existingIndex] });
  }

  const newEntry = {
    id: generateId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    tag: tag || 'Newsletter',
    joined: joinedDate,
    status: 'active'
  };

  list.unshift(newEntry);
  writeSubscribers(list);
  return res.status(201).json({ message: 'Saved', data: newEntry });
}

app.post('/api/subscribe', handleAddSubscriber);
app.post('/api/subscribers', handleAddSubscriber);
app.post('/api/maillist', handleAddSubscriber);

app.patch('/api/subscribers/:id', (req, res) => {
  const { id } = req.params;
  const list = readSubscribers();
  const item = list.find(s => String(s.id) === String(id));
  if (!item) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }

  if (req.body.status) item.status = req.body.status;
  if (req.body.name !== undefined) item.name = req.body.name;
  if (req.body.tag !== undefined) item.tag = req.body.tag;

  writeSubscribers(list);
  res.json({ message: 'Updated', data: item });
});

app.delete('/api/subscribers/:id', (req, res) => {
  const { id } = req.params;
  let list = readSubscribers();
  const beforeCount = list.length;
  list = list.filter(s => String(s.id) !== String(id));
  if (list.length === beforeCount) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }
  writeSubscribers(list);
  res.json({ message: 'Deleted', id });
});

// Backward compatibility: POST to root '/'
app.post('/', (req, res) => {
  if (req.body && req.body.email) {
    return handleAddSubscriber(req, res);
  }
  res.status(400).json({ error: 'Invalid request' });
});

// Explicit route rewrites for clean URLs
const routeMappings = {
  '/about': path.join(__dirname, 'about', 'index.html'),
  '/about/': path.join(__dirname, 'about', 'index.html'),
  '/contact': path.join(__dirname, 'contact', 'index.html'),
  '/contact/': path.join(__dirname, 'contact', 'index.html'),
  '/donate': path.join(__dirname, 'donate', 'index.html'),
  '/donate/': path.join(__dirname, 'donate', 'index.html'),
  '/gallery': path.join(__dirname, 'gallery', 'index.html'),
  '/gallery/': path.join(__dirname, 'gallery', 'index.html'),
  '/impact': path.join(__dirname, 'impact', 'index.html'),
  '/impact/': path.join(__dirname, 'impact', 'index.html'),
  '/individuals': path.join(__dirname, 'individuals', 'index.html'),
  '/individuals/': path.join(__dirname, 'individuals', 'index.html'),
  '/news': path.join(__dirname, 'news', 'index.html'),
  '/news/': path.join(__dirname, 'news', 'index.html'),
  '/partnership': path.join(__dirname, 'partnership', 'index.html'),
  '/partnership/': path.join(__dirname, 'partnership', 'index.html'),
  '/payment': path.join(__dirname, 'payment', 'index.html'),
  '/payment/': path.join(__dirname, 'payment', 'index.html'),
  '/payment/success': path.join(__dirname, 'payment', 'success.html'),
  '/payment/success/': path.join(__dirname, 'payment', 'success.html'),
  '/mailing_list': path.join(__dirname, 'mailing_list.html'),
  '/mailing_list/': path.join(__dirname, 'mailing_list.html'),
  '/missions/2026/axim': path.join(__dirname, 'missions', '2026', 'axim', 'axim.html'),
  '/missions/2026/axim/': path.join(__dirname, 'missions', '2026', 'axim', 'axim.html')
};

Object.entries(routeMappings).forEach(([route, filePath]) => {
  app.get(route, (req, res) => {
    res.sendFile(filePath);
  });
});

// Serve all static files (CSS, JS, images, font, subdirectories)
app.use(express.static(__dirname, { extensions: ['html', 'htm'] }));

// Fallback to index.html for root or unknown HTML navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Zoe Tirzah Missions server running at http://0.0.0.0:${PORT}`);
});
