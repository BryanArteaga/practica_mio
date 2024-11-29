
import {ICiudad, IEstudiante, Icolegio, estudiantes, colegios, ciudades} from './data'


function getEstudiantesByIdUsingPromises(id:number):Promise<IEstudiante>{
    return new Promise((resolve, reject) => {
        const estudiante= estudiantes.find(e=>e.id===id);
        if (!estudiante)
        {
            const error = new Error ("Estudiante no encontrado");
            reject(error);
            
        }
        resolve(estudiante!);
    })
}

function getColegiosByIdUsingPromises(id:number):Promise<Icolegio>{
    return new Promise((resolve, reject) => {
        const colegio = colegios.find(c => c.id === id);
        if (!colegio) 
        {
            const error =new Error ("Colegio no encontrado");
            reject(error);
        }
        resolve(colegio!);
    })
}

function getCiudadesByIdUsingPromises(id:number):Promise<ICiudad>{
    return new Promise((resolve, reject) => {
        const ciudad = ciudades.find(c => c.id === id);
        if (!ciudad) 
        {
            const error =new Error ("Ciudad no encontrado");
            reject(error);
        }
        resolve(ciudad!);
    })
}

export { getCiudadesByIdUsingPromises, getEstudiantesByIdUsingPromises, getColegiosByIdUsingPromises };