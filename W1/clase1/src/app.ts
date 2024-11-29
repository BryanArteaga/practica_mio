//import { nombreEstudiante } from './Ejemplo/ejemplo1'
//console.log(nombreEstudiante);

import { nombreEstudiante, operationMatematica } from './Ejemplo';
    console.log(
        nombreEstudiante,
        'suma = ',
        operationMatematica ({a:46884846, b: 8468484, operator: '+'})
    );

import { Estudiantes } from './Ejemplo';
    console.log(Estudiantes);

import {operacionCallback} from './Ejemplo/ejemplo4'

operacionCallback(2, 3, (a, b)=> a+b, (resultado)=> {
    console.log(resultado);
})