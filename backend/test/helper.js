import supertest from 'supertest';
import chai from 'chai';
import uuid from 'uuid';
import app from '../server.js';

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = supertest(app);