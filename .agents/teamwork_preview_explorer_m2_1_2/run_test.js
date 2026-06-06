import { exec } from 'child_process';
exec('node scripts/test_multiplayer_bots.js', (err, stdout, stderr) => {
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);
});
