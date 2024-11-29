import {Tutor, Tutorado, Tutoria, ITutor, Itutorado, Itutoria} from './data'

function BuscarTutorByidUsingPromises(id:number):Promise<ITutor>{
    return new Promise((resolve, reject) => {
        const tutor= Tutor.find(tutor=>tutor.id===id);
        if (!tutor)
        {
            const error = new Error ("Tutor no encontrado");
            reject(error);
            
        }
        resolve(tutor!);
    })
}


function BuscarTutoradoByidUsingPromises(id:number):Promise<Itutorado>{
    return new Promise((resolve, reject) => {
        const tutorado= Tutorado.find(tutorado=>tutorado.id===id);
        if (!tutorado){
            const error = new Error ("Tutorado no encontrado");
            reject(error);
        }
        resolve(tutorado!);
    })
}

function BuscarTutoriasByidUsingPromises(id:number):Promise<Itutoria>{
    return new Promise((resolve, reject) => {
        const tutoria= Tutoria.find(tutoria=>tutoria.id===id);
        if (!tutoria){
            const error = new Error ("Tutoria no encontrada");
            reject(error);
        }
        resolve(tutoria!);
    })       
}

export {
    BuscarTutorByidUsingPromises,
    BuscarTutoriasByidUsingPromises,
    BuscarTutoradoByidUsingPromises
}