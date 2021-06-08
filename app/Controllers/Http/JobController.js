'use strict';

const Job = use('App/Models/Job');

class JobController {
  async home({ view }) {
    const jobs = await Job.all();
    return view.render('index', { jobs: jobs.toJSON() });
  }

  async userIndex({ auth, view }) {
    const jobs = await auth.user
      .jobs()
      .fetch();
    return view.render('jobs', { jobs: jobs.toJSON() });
  }

  async create({ auth, request, session, response }) {
    try {
      const { title, link, description } = request.body;

      const postedJob = await auth.user.jobs()
        .create({
          title,
          link,
          description
        });

      session.flash({ message: 'Your job has successfully been posted!' });
      return response.status(201).redirect('back');
    } catch (error) {
      await response.status(400).send({ 'ERROR': error.message });
    }
  }
}
module.exports = JobController;