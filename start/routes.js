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
Route.get('/jobs', 'JobController.userIndex');
Route.post('/create/', 'JobController.create').validator('CreateJob');
Route.group(() => {
  Route.get('', 'JobController.newJob');
  Route.post('/update/:id', 'JobController.update').validator('CreateJob');
  Route.get('/edit/:id', 'JobController.edit');
  Route.get('/delete/:id', 'JobController.delete');
}).prefix('/post-a-job');


/*----- user authentication -----*/
// signup
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
// login
Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');
// logout
Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/');
});