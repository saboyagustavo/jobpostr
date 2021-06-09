'use strict';

class CreateJob {
  get rules() {
    return {
      'title': 'required:jobs',
      'link': 'required:jobs',
      'description': 'required'
    };
  }
  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required!',
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateJob;
