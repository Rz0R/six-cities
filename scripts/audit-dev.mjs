import { spawnSync } from 'node:child_process';

const result = spawnSync('npm', ['audit', '--json'], { encoding: 'utf8' });
process.stderr.write(result.stderr ?? '');
if (result.error) throw result.error;
if (result.status === 0) {
  console.log('Full dependency audit passed.');
} else {
  const report = JSON.parse(result.stdout);
  const advisories = Object.values(report.vulnerabilities ?? {})
    .flatMap(({ via }) => via.filter((item) => typeof item !== 'string'));
  const knownPicomatchAdvisory = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';
  if (result.status !== 1 || report.error || advisories.length === 0 ||
      advisories.some(({ name, url }) => name !== 'picomatch' || url !== knownPicomatchAdvisory)) {
    console.error(result.stdout);
    process.exitCode = 1;
  } else {
    // The separate production audit must pass. Remove this exception once upstream releases a fix.
    console.warn(`::warning::Development dependencies still report ${knownPicomatchAdvisory}`);
  }
}
