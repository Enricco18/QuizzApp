'use strict'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import AutoLoad from '@fastify/autoload';

export default async function (fastify, opts) {
  // Place here your custom code!
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    await mongoose.connect("mongodb://localhost:27017/TESTE")
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
