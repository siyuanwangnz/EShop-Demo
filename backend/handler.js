'use strict';
import app from './server.js'
import serverless from 'serverless-http'

export const hello = serverless(app)
