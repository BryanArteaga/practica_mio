import {Tutor, Tutorado, Tutoria, ITutor, Itutorado, Itutoria} from './data'

async function BuscarTutorByIdaa(id:number){
    const tutor = Tutor.find(tutor=>tutor.id===id);
    if (!tutor){
        const error = new Error();
        error.message= "No encontrado el Tutor";
        throw error;    
    }
    return tutor;
}

async function BuscarTutoradoByIdaa(id:number) {
    const tutorado = Tutorado.find(tutorado=>tutorado.id===id);
    if (!tutorado){
        const error = new Error();
        error.message= "No encontrado el tutorado";
        throw error;
    }
    return tutorado;
}

async function BuscarTutoriasByIdaa(id:number) {
    const tutoria = Tutoria.find(tutoria=>tutoria.id===id);
    if(!tutoria){
        const error = new Error();
        error.message= "No encontrado la tutoria";
        throw error;
    }
    return tutoria;
}

export {
    BuscarTutorByIdaa,
    BuscarTutoradoByIdaa,
    BuscarTutoriasByIdaa
}