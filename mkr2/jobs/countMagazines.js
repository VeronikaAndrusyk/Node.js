const CronJob = require('cron').CronJob;
const Kiosk = require('../models/kiosk.model');

function startCountMagazinesJob() {
  const job = new CronJob(
    '0 * * * *', //  every hour
    async () => {
      try {
        const magazineCount = await Kiosk.countDocuments({ mark: 'magazine' });
        console.log(`[countMagazines.job] Total number of magazines: ${magazineCount}`);
      } catch (err) {
        console.error(err);
      }
    },
    null,
    true,
    'Europe/Kiev' 
  );

  job.start();
}

module.exports = startCountMagazinesJob;
