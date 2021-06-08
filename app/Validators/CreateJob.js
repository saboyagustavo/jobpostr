'use strict';

class CreateJob {
  get rules() {
    return {
      'title': 'required|unique:jobs',
      'link': 'required|unique:jobs',
      'description': 'required'
    };
  }
  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required!',
      'unique': 'Oh no, a job with that {{ field }} already exists!'
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateJob;
