interface INotas {
    materia: string;
    nota: number;
}

interface IDireccion {
    calle: string;
    numero: number;
}

interface IEstudiante {
    nombre: string;
    edad: number;
    direcciones: IDireccion [];
    notas:INotas [];

}
const Estudiantes: IEstudiante[] = [
    {

        nombre: 'Bryan',
        edad: 20,
        direcciones: [
            {
                calle: 'Calle 1',
                numero: 1
            },
            {
                calle: 'calle 2',
                numero: 2
            }
        ],
        notas:[
            {
                materia: 'matematicas',
                nota: 10
                
            }
        ]
    }
]

export {
    Estudiantes,
    IEstudiante,
    IDireccion,
    INotas
}