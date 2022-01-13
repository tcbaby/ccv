
const curlconverter = require('curlconverter')

const outputs = [
    {
        name: 'Ansible',
        extension: 'yml',
        command: curlconverter.toAnsible
    }, {
        name: 'R',
        extension: 'r',
        command: curlconverter.toR
    },
    {
        name: 'Python',
        extension: 'py',
        command: curlconverter.toPython
    },
    {
        name: 'Browser',
        extension: 'js',
        command: curlconverter.toBrowser
    },
    {
        name: 'Node',
        extension: 'js',
        command: curlconverter.toNodeRequest
    },
    {
        name: 'PHP',
        extension: 'php',
        command: curlconverter.toPhp
    },
    {
        name: 'Go',
        extension: 'go',
        command: curlconverter.toGo
    },

    {
        name: 'Rust',
        extension: 'rs',
        command: curlconverter.toRust
    },
    {
        name: 'Strest',
        extension: 'strest.yml',
        command: curlconverter.toStrest
    },
    {
        name: 'Json',
        extension: 'json',
        command: curlconverter.toJsonString
    },
    {
        name: 'Dart',
        extension: 'dart',
        command: curlconverter.toDart
    },
    {
        name: 'Elixir',
        extension: 'ex',
        command: curlconverter.toElixir
    },
    {
        name: 'MATLAB',
        extension: 'm',
        command: curlconverter.toMATLAB
    }, {
        name: 'Java',
        extension: 'java',
        command: curlconverter.toJava
    }
]

const argv = process.argv

const curlIdx = argv.findIndex(a => a === 'curl');
const langIdx = argv.findIndex((a, i) => i < curlIdx && a === '-l') + 1
let lang = 'Node'
let converter = curlconverter.toNodeRequest;
let curlCmd = '';

if (curlIdx == -1) {
    console.log(`Usage: node ${__filename} [-l <language>] curl...`)
    process.exit(-1)
}

if (langIdx > 0) {
    const e = outputs.find(e => e.name === argv[langIdx])
    if (e) {
        lang = e.name
        converter = e.command
    } else {
        console.log(`仅支持：${outputs.map(e => e.name)}`)
        process.exit(-1)
    }
}


process.argv.slice(curlIdx).forEach(e => curlCmd += ' ' + (e.match(/^[-"']|curl/) ? e : `'${e}'`))
// console.log(`\n${curlCmd}\n`)

console.log()
console.log(converter(curlCmd))