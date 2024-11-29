import {Tutor, Tutorado, Tutoria, ITutor, Itutorado, Itutoria} from './data'

function BuscarTutorByid(id: number, callback:(err: Error | null, tutor?:ITutor)=>void){

    const tutor = Tutor.find(tutor=>tutor.id===id);
    if (!tutor){
        const error = new Error ("Tutor no encontrado");
        return callback (error);
    }
    callback(null, tutor);
}

function BuscarTutoradoByid(id: number, callback:(err: Error | null, tutorado?:Itutorado)=>void){
    const tutorado = Tutorado.find(tutorado=>tutorado.id===id);
    if (!tutorado){
        const error = new Error ("Tutorado no encontrado");
        return callback (error);
    }
    callback(null, tutorado);
}

function BuscarTutoriasByid(id: number, callback:(err: Error | null, tutor?:Itutoria)=>void){
    const tutoria = Tutoria.find(tutoria=>tutoria.id===id);
    if (!tutoria){
        const error = new Error ("Tutoria no encontrada");
        return callback (error);
    }
    callback(null, tutoria);
}

export {
    BuscarTutorByid,
    BuscarTutoradoByid,
    BuscarTutoriasByid
}