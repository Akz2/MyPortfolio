// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


// GET: Root health / welcome route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Aniket Portfolio API is running',
    routes: ['/api/projects', '/api/resume', '/api/contact'],
  });
});
// GET: Fetch all featured projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
    } catch (error) {
    console.error('PROJECTS ROUTE ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

// GET: Fetch the latest resume URL
app.get('/api/resume', async (req, res) => {
  try {
    const resume = await prisma.asset.findUnique({
      where: { assetName: 'resume_2026' }
    });
    res.json({ url: resume ? resume.fileUrl : null });
    } catch (error) {
    console.error('RESUME ROUTE ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch resume', details: error.message });
  }
});

// POST: Handle the Brutalist Contact Form
app.post('/api/contact', async (req, res) => {
  const { senderName, senderEmail, message } = req.body;
  
  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // 1. Save to database
    const newMessage = await prisma.message.create({
      data: { senderName, senderEmail, message }
    });

    // Note: Nodemailer logic goes here to email fentonptc890@gmail.com
    // For now, we successfully save it to the DB to ensure the API works.

    res.status(200).json({ success: true, message: 'Message saved securely.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Brutalist Backend running on http://localhost:${PORT}`);
});