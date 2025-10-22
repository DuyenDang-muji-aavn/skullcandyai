import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import componentContextRouter from './routes/componentContext';
import listComponentsRouter from './routes/listComponents';
import listTokensRouter from './routes/listTokens';
import compareVariantsRouter from './routes/compareVariants';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.MCP_PORT || 8787;

// Middleware
app.use(cors());
app.use(express.json());

// Request timeout middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Set timeout to 5 seconds
  req.setTimeout(5000);
  res.setTimeout(5000);
  next();
});

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/component-context', componentContextRouter);
app.use('/list-components', listComponentsRouter);
app.use('/list-tokens', listTokensRouter);
app.use('/compare-variants', compareVariantsRouter);

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'SkullCandy Design System MCP Server',
    version: '0.1.0',
    status: 'running',
    endpoints: [
      'GET /component-context?name=<Component>',
      'GET /list-components',
      'GET /list-tokens?scope=color,spacing,typography',
      'GET /compare-variants?name=<Component>',
    ],
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    meta: { version: '0.1.0', source: 'skullcandy-mcp' },
    status: 'error',
    message: err.message,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🎨 SkullCandy Design System MCP Server');
  console.log('='.repeat(60));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📋 Available endpoints:');
  console.log(
    `   • GET http://localhost:${PORT}/component-context?name=Button`
  );
  console.log(`   • GET http://localhost:${PORT}/list-components`);
  console.log(
    `   • GET http://localhost:${PORT}/list-tokens?scope=color,spacing`
  );
  console.log(
    `   • GET http://localhost:${PORT}/compare-variants?name=Button`
  );
  console.log('\n💡 Usage:');
  console.log('   Before suggesting UI code, call:');
  console.log(
    `   http://localhost:${PORT}/component-context?name=Button`
  );
  console.log('   Use code.import, valid props, and tokens returned.');
  console.log('='.repeat(60) + '\n');
});

// Set server timeout
server.timeout = 5000;
server.keepAliveTimeout = 5000;
server.headersTimeout = 5100;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default app;
