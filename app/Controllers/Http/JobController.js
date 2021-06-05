'use strict';

const Job = use('App/Models/Job');

class JobController {
  async home({ view }) {
    // create a job
    const job = new Job;
    job.title = 'My job title';
    job.link = 'https://www.linkedin.com';
    job.description = 'My job description';

    await job.save();

    // fetch a job
    const jobs = await Job.all();

    return view.render('index', { jobs: jobs.toJSON() });
  }

}

module.exports = JobController;
