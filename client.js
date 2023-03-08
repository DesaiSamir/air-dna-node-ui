const params = require('minimist')(process.argv);
const args = [ params.cmd ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('yarn', args, opts);