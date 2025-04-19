'use strict';

const execa = require('execa');
const { mkdirp, writeFileSync, existsSync, readdirSync } = require('fs-extra');
const { join } = require('path');
const { rmSync } = require('fs');

const cli = require.resolve('create-react-app/index.js');

jest.setTimeout(1000 * 60 * (process.env.RUNNER_OS === 'macOS' ? 10 : 5));

const projectName = 'test-app';
const genPath = join(__dirname, projectName);

const generatedFiles = [
  '.gitignore',
  'README.md',
  'node_modules',
  'package.json',
  'public',
  'src',
  'package-lock.json',
];

const removeGenPath = () => {
  rmSync(genPath, {
    recursive: true,
    force: true,
  });
};

beforeEach(() => {
  console.log(`Cleaning up test directory: ${genPath}`);
  removeGenPath();
});
afterAll(async () => {
  removeGenPath();
  await new Promise(resolve => setTimeout(resolve, 100));
});

const run = async (args, options) => {
  process.stdout.write(
    `::group::Test "${
      expect.getState().currentTestName
    }" - "create-react-app ${args.join(' ')}" output:\n`
  );
  const result = execa('node', [cli].concat(args), options);
  result.stdout.on('data', chunk =>
    process.stdout.write(chunk.toString('utf8'))
  );
  const childProcessResult = await result;
  process.stdout.write(`ExitCode: ${childProcessResult.exitCode}\n`);
  process.stdout.write('::endgroup::\n');
  const files = existsSync(genPath)
    ? readdirSync(genPath).filter(f => existsSync(join(genPath, f)))
    : null;
  return {
    ...childProcessResult,
    files,
  };
};

const expectAllFiles = (arr1, arr2) =>
  expect(new Set(arr1)).toEqual(new Set(arr2));

describe('create-react-app', () => {
  it('check yarn installation', async () => {
    const { exitCode } = await execa('yarn', ['--version']);
    expect(exitCode).toBe(0);
  });

  it('asks to supply an argument if none supplied', async () => {
    const { exitCode, stderr, files } = await run([], { reject: false });
    expect(exitCode).toBe(1);
    expect(stderr).toContain('Please specify the project directory');
    expect(files).toBe(null);
  });

  it('creates a project on supplying a name as the argument', async () => {
    const { exitCode, files } = await run([projectName], { cwd: __dirname });
    expect(exitCode).toBe(0);
    expectAllFiles(files, generatedFiles);
  });

  it('warns about conflicting files in path', async () => {
    await mkdirp(genPath);
    const pkgJson = join(genPath, 'package.json');
    writeFileSync(pkgJson, '{ "foo": "bar" }');

    const { exitCode, stdout, files } = await run([projectName], {
      cwd: __dirname,
      reject: false,
    });

    expect(exitCode).toBe(1);
    expect(stdout).toContain(
      `The directory ${projectName} contains files that could conflict`
    );
    expectAllFiles(files, ['package.json']);
  });

  it('creates a project in the current directory', async () => {
    await mkdirp(genPath);
    const { exitCode, files } = await run(['.'], { cwd: genPath });
    expect(exitCode).toBe(0);
    expectAllFiles(files, generatedFiles);
  });

  it('uses yarn as the package manager', async () => {
    const { exitCode, files } = await run([projectName], {
      cwd: __dirname,
      env: { npm_config_user_agent: 'yarn' },
    });

    expect(exitCode).toBe(0);
    const generatedFilesWithYarn = generatedFiles.map(file =>
      file === 'package-lock.json' ? 'yarn.lock' : file
    );
    expectAllFiles(files, generatedFilesWithYarn);
  });

  it('creates a project based on the typescript template', async () => {
    const { exitCode, files } = await run(
      [projectName, '--template', 'typescript'],
      { cwd: __dirname }
    );

    expect(exitCode).toBe(0);
    expect(files).toContain('tsconfig.json');
  });

  it('fails gracefully with an invalid template name', async () => {
    const { exitCode, stderr } = await run(
      [projectName, '--template', 'unknown-template'],
      { cwd: __dirname, reject: false }
    );

    expect(exitCode).toBe(1);
    expect(stderr).toContain('Could not find template');
  });

  it('fails with an invalid project name', async () => {
    const { exitCode, stderr } = await run(['123invalid'], {
      cwd: __dirname,
      reject: false,
    });

    expect(exitCode).toBe(1);
    expect(stderr).toContain('may not start with a number');
  });

  it('includes ESLint configuration by default', async () => {
    const { files } = await run([projectName], { cwd: __dirname });
    const hasEslintFile =
      files.includes('.eslintrc.json') || files.includes('.eslintrc.js');
    expect(hasEslintFile).toBe(true);
  });

  it('matches stdout snapshot when creating a project', async () => {
    const { stdout } = await run([projectName], { cwd: __dirname });
    expect(stdout).toMatchSnapshot();
  });
});
