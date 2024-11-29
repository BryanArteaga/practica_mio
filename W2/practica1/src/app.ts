import {ITutor, Itutorado, Itutoria} from './Repository'

//recorrido
import {recorrerTutor, recorrerTutorado, recorrerTutorias} from './Repository'

recorrerTutor();
recorrerTutorado();
recorrerTutorias();

//callback
import {BuscarTutorByid, BuscarTutoradoByid, BuscarTutoriasByid} from './Repository'

BuscarTutorByid(1,(err, Tutor)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(Tutor)

    BuscarTutoradoByid(1,(err, Tutorado)=>{
        if(err){
            console.log(err)
            return;
        }
        console.log(Tutorado)

        BuscarTutoriasByid(1,(err, Tutoria)=>{
            if(err){
                console.log(err)
                return;
            }
            console.log(Tutoria)
        })
    })
})

//promises
import {BuscarTutorByidUsingPromises, BuscarTutoradoByidUsingPromises, BuscarTutoriasByidUsingPromises} from './Repository'

BuscarTutoriasByidUsingPromises(2)
  .then((tutoria: Itutoria) => {return BuscarTutorByidUsingPromises(tutoria.tutorID)})
  .then((tutor: ITutor) => {console.log(tutor); 
    return BuscarTutoradoByidUsingPromises(2)})
  .then((tutorado: Itutorado) => {console.log(tutorado)})
  .catch(error => console.log(error));


//asyncAwait
import {BuscarTutoradoByIdaa, BuscarTutorByIdaa, BuscarTutoriasByIdaa} from './Repository'

(async ()=>{
    try{
        const tutorias = await BuscarTutoriasByIdaa(3)
        const tutor = await BuscarTutorByIdaa(tutorias.tutorID);
        const tutorado = await BuscarTutoradoByIdaa(tutorias.tutoradoID);
        console.log (tutorias, tutor, tutorado);
    } catch (error) {
        console.log(error)
    }
}) ()

//RestService
import {fetchData, IPost} from './Repository'
fetchData<IPost>('https://gorest.co.in/public/v2/users/6940765/posts')
     .then(posts => {
         console.log(posts);
     })
     .catch(error => console.error(error));
