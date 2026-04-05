import { Server } from 'http';
import os from 'os';
import mongoose from 'mongoose';
import chalk from 'chalk';
import app from './app.js';
import config from './app/config/index.js';

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return '0.0.0.0';
};

let server: Server;

async function main() {
  try {
    console.log(chalk.blue.bold('\n🚀 BuddyScript Backend is initializing...'));
    
    await mongoose.connect(config.database_url as string);
    console.log(chalk.green.bold('✅ Database connected successfully!'));

    server = app.listen(config.port, () => {
      const ip = getIPAddress();
      console.log(`
${chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
${chalk.blue.bold('  ____            _     _       ____            _            _   ')}
${chalk.blue.bold(' | __ ) _   _  __| | __| |_   _/ ___|  ___ _ __(_)_ __ | |_ ')}
${chalk.blue.bold(' |  _ \\| | | |/ _` |/ _` | | | \\___ \\ / __| \'__| | \'_ \\| __|')}
${chalk.blue.bold(' | |_) | |_| | (_| | (_| | |_| |___) | (__| |  | | |_) | |_ ')}
${chalk.blue.bold(' |____/ \\__,_|\\__,_|\\__,_|\\__, |____/ \\___|_|  |_| .__/ \\__|')}
${chalk.blue.bold('                          |___/                  |_|         ')}
${chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

  ${chalk.white.bold('Status:')}     ${chalk.green('Active')}
  ${chalk.white.bold('Port:')}       ${chalk.yellow(config.port)}
  ${chalk.white.bold('Local:')}      ${chalk.underline.cyan(`http://localhost:${config.port}`)}
  ${chalk.white.bold('Network:')}    ${chalk.underline.cyan(`http://${ip}:${config.port}`)}
  ${chalk.white.bold('Env:')}        ${chalk.magenta(process.env.NODE_ENV || 'development')}

${chalk.cyan.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
      `);
    });
  } catch (err) {
    console.log(chalk.red.bold('❌ Database connection failed!'));
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
