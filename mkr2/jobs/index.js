const enableScheduleJobs = true;
const startHeartBeatJob = require('./heartbeat.job');
const startCountMagazinesJob  = require('./countMagazinesJob ');

function start() {
    if (!enableScheduleJobs) {
        console.warn('Jobs scheduling is not enabled.');
        return;
    }

    startHeartBeatJob();
    startCountMagazinesJob();
}

module.exports = start;