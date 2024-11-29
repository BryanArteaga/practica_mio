import {ICiudad, ciudades, IEstudiante, estudiantes, Icolegio, colegios} from './data'

function getEstudiantesById(id: number, callback:(err: Error | null, estudiante?:IEstudiante)=>void){

    const estudiante = estudiantes.find(e=>e.id===id);
    if (!estudiante){
        const error = new Error ("Estudiante no encontrado");
        callback: error;
    }
    callback(null, estudiante);
}

function getColegiosById(id: number, callback:(err: Error | null, colegios?:Icolegio)=>void){
    
    const colegio = colegios.find(c=>c.id===id);
    if (!colegio){
        const error = new Error ("Colegio no encontrado");
        callback: error;
    }
    callback(null,  colegio);
}

function getCiudadesById(id: number, callback:(err: Error | null, ciudades?:ICiudad)=>void){
    
    const ciudad = ciudades.find(c=>c.id===id);
    if (!ciudad){
        const error = new Error ("ciudad no encontrado");
        callback: error;
    }
    callback(null, ciudad);
}

export { getEstudiantesById, getColegiosById, getCiudadesById};