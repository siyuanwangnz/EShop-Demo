'use strict';
import app from './server.js'
import serverless from 'serverless-http'

module.exports.hello = serverless(app)
