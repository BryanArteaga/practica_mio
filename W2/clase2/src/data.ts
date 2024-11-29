interface IEstudiante {
    id: number;
    nombre: string;
    edad: number;
    colegioId:number;
}

interface Icolegio {
    id: number;
    nombre:string;
    ciudadId: number;
}

interface ICiudad {
    id: number;
    nombre: string;
}

const estudiantes:IEstudiante[]=[
    {id:1,nombre:'Juan',edad:20,colegioId:1}
]

const colegios: Icolegio[]=[
    {id: 1, nombre: 'juan montalvo', ciudadId:1}
]

const ciudades: ICiudad[]=[
    {id:1, nombre: 'manta'}
]

export {
    IEstudiante,
    Icolegio,
    ICiudad,
    estudiantes,
    colegios,
    ciudades
}