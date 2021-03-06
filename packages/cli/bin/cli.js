import program from 'commander'
import { each } from 'lodash'
import pkg from '../package.json'
import logo from '../logo'
import extensions from '../extensions'
console.log(logo())
console.log(`BMO CLI v${pkg.version}`)

const run = async () => {
  const ext = await extensions()
  program
    .version('0.1.0')
    .command('start', 'start an application server in the current directory', { executableFile: `${__dirname}/bmo-start.js` })
    .command('create', 'creates a BMO http application', { executableFile: `${__dirname}/bmo-create.js` })
    .command('add', 'adds a npm module to the bmo dependencies, and installs if it is not in the package.json', { executableFile: `${__dirname}/bmo-add.js` })

  each(ext.commands, (cmd, key) => {
    console.log(`Loading command ${key}`)
    const executableFile = cmd.file
    if (executableFile) {
      program.command(cmd.format, cmd.description, { executableFile })
    } else {
      if (!cmd.action) {
        throw new Error(`command ${key} must define either action or file`)
      }

      program
        .command(cmd.format)
        .description(cmd.description)
        .action(cmd.action)
    }
  })
  program.parse(process.argv)
}

run()
