//Biblioteca para crear procesos con node js
const { spawn } = require('child_process');

// Comando para ejecutar GDB
const comando = 'gdb-multiarch prog.elf';
// Argumentos para GDB y el programa que deseas depurar
const argumentos = ['main'];

// Se crea el proceso GDB
const gdb = spawn(comando, argumentos);


// Maneja la salida estándar de GDB
gdb.stdout.on('data', (datos) => {
  console.log(`Salida estándar de GDB: ${datos}`);
});

//Se establece la codificacion de caracteres para la entrada estandar del proceso actual
process.stdin.setEncoding('utf-8');
//Evento que registra la entrada estandar del proceso actual
process.stdin.on('data', (comando) => {
  enviarComando(comando);
});

// Envía comandos a GDB
const enviarComando = (comando) => {
    gdb.stdin.write(comando);
};

// Maneja la salida de error de GDB
gdb.stderr.on('data', (datos) => {
    console.error(`Error de GDB: ${datos}`);
});

// Evento cuando el proceso GDB termina
gdb.on('close', (codigo) => {
    console.log(`Proceso GDB terminado con código de salida ${codigo}`);
});
