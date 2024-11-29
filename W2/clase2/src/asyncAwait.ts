import { ICiudad, Icolegio, IEstudiante, colegios, estudiantes, ciudades} from './data'

async function getEstudiantesByIdaa(id:number){
    const estudiante = estudiantes.find(e=>e.id===id);
    if (!estudiante){
        const error = new Error();
        error.message= "No encontrado el estudiante";
        throw error;    
    }
    return estudiante;
}

async function getColegiosByIdaa(id:number){
    const colegio = colegios.find(c=>c.id===id);
    if (!colegio){
        const error = new Error();
        error.message= "no encontrado el colegio";
        throw error;
    }
    return colegio;
}

export {
    getEstudiantesByIdaa,
    getColegiosByIdaa
}