'use strict';

const JobController = require('../app/Controllers/Http/JobController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/*----- job controller -----*/
Route.get('/', 'JobController.home');
Route.post('/newJob', 'JobController.create');
Route.put('/updateJob/:id', 'JobController.update');

/*----- user authentication -----*/
Route.on('/signup').render('auth.signup');
Route.on('/login').render('auth.login');
