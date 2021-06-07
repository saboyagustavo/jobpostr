'use strict';

const User = use('App/Models/User');

class UserController {
  async create({ auth, request, response }) {
    const user = await User
      .create(request.only(['username', 'email', 'password']));

    await auth.login(user);
    return response.redirect('/');
  }
  async login({ auth, request, session, response }) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      return response.redirect('/');
    } catch (error) {
      session.flash({ loginError: 'Sorry, but these credentials do not work!' });
      return response.redirect('/login');
    }
  }
}

module.exports = UserController;
