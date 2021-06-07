'use strict';

const Job = use('App/Models/Job');

class JobController {
  async home({ view }) {
    const jobs = await Job.all();
    return view.render('index', { jobs: jobs.toJSON() });
  }

  async create({ request, response }) {
    try {
      const { title, link, description } = request.body;
      if (!title || !link || !description) {
        throw new Error('MISSING REQUIRED INFORMATION!');
      }

      const job = new Job;
      job.title = title;
      job.link = link;
      job.description = description;

      await job.save();
      await response.status(201).send({ 'CREATED': job });
    } catch (error) {
      await response.status(422).send({ 'ERROR': error.message });
    }
  }
}
module.exports = JobController;