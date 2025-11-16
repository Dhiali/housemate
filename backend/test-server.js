import express from 'express';

const app = express();
const PORT = 5001;

app.get('/test', (req, res) => {
  console.log('📡 Test endpoint hit!');
  res.json({ message: 'Test server is working!' });
});

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Test server running on port ${PORT} on IPv4`);
  console.log('Server address:', server.address());
  
  // Keep process alive
  setInterval(() => {
    console.log('🔄 Server is still alive...');
  }, 5000);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

server.on('close', () => {
  console.log('🔻 Server closed');
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  console.error('❌ Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, closing server');
  server.close();
  process.exit(0);
});

process.on('exit', (code) => {
  console.log(`🚪 Process exiting with code: ${code}`);
});