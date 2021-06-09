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

  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render('edit', { job: job });
  }

  async update({ response, request, session, params }) {
    const job = await Job.find(params.id);

    job.title = request.all().title;
    job.link = request.all().link;
    job.description = request.all().description;

    await job.save();

    session.flash({ message: 'Your job has been updated!' });
    return response.redirect('/post-a-job');
  }

  async delete({ params, session, response }) {
    const job = await Job.find(params.id);
    await job.delete();
    session.flash({ message: 'Your job has successfully been removed!' });
    return response.status(204).redirect('back');
  }

}
module.exports = JobController;