import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/error.middleware.js';
import router from './app/routes/index.js';

const app: Application = express();

// Parsers
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://10.10.7.47:3001'], credentials: true }));
app.use(morgan('dev'));

// Application Routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BuddyScript API | Premium Social Backend</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0f172a; color: #f8fafc; overflow: hidden; }
        .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .glow { box-shadow: 0 0 50px -12px rgba(59, 130, 246, 0.5); }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      </style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-6 relative">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div class="glass p-12 rounded-[40px] max-w-2xl w-full text-center relative glow border-slate-700/50">
        <div class="mb-8 flex justify-center">
          <div class="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
          </div>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          BuddyScript API
        </h1>
        <p class="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
          Modern social platform backend engine. <br/>
          Engineered for performance, security, and scalability.
        </p>

        <div class="grid grid-cols-2 gap-4 mb-10">
          <div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 transition-all hover:bg-slate-800">
            <div class="text-blue-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Status</div>
            <div class="text-xl font-bold flex items-center justify-center gap-2">
              <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Operational
            </div>
          </div>
          <div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 transition-all hover:bg-slate-800">
            <div class="text-indigo-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Version</div>
            <div class="text-xl font-bold">1.0.0 Stable</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/api" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-95">
            Documentation
          </a>
          <a href="https://github.com" target="_blank" class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl border border-slate-700 transition-all active:scale-95">
            GitHub Repo
          </a>
        </div>
        
        <div class="mt-12 pt-10 border-t border-slate-700/50">
          <p class="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Powered by Node.js &bull; MongoDB &bull; TypeScript
          </p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
  });
});

export default app;
