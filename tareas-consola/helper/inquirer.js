
const inquirer = require('inquirer');
require('colors');


const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: `-- ${'¿'.green}Qué desea hacer${'?'.green} -->`,
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            }
            ,
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            }
            ,
            {
                value: '5',
                name: `${'5.'.green} Completar tarea`
            }
            ,
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'7.'.green} Salir`
            }

        ]
    }
];





const inquirerMenu = async () => {
    console.clear();
    console.log('\n==========================='.green);
    console.log('** Seleccione una opción **'.yellow);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]

    console.log('\n');

    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${(i + 1)}`.green;

        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (mensaje) => {

    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        mensaje
    }];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar
}
