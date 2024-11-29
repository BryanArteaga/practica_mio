//trabajar con callback
import { getCiudadesById, getColegiosById, getEstudiantesById } from './callback'
import { ICiudad, Icolegio, IEstudiante } from './data';

getEstudiantesById(1,(err, estudiantes)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(estudiantes)
    getColegiosById(estudiantes!.colegioId, (err, colegios)=>{
        if(err){
            console.log(err)
            return;
        }
        console.log(colegios)
        getCiudadesById(colegios!.ciudadId, (err, ciudades)=>{
            if(err){
                console.log(err)
                return;
            }
        })
    })
})

//trabajar con promises
import { getCiudadesByIdUsingPromises, getColegiosByIdUsingPromises, getEstudiantesByIdUsingPromises } from './promises'

getEstudiantesByIdUsingPromises(1)
.then((estudiantes:IEstudiante)=> { return getColegiosByIdUsingPromises(estudiantes.colegioId)} )
.then((colegios:Icolegio)=> { return getCiudadesByIdUsingPromises(colegios.ciudadId)})
.then((ciudades:ICiudad)=> { console.log(ciudades)})
.catch(error=> console.log(error))

//trabajar con asyncAwait
import {getColegiosByIdaa, getEstudiantesByIdaa} from './asyncAwait'

(async ()=>{
    try{
        const estudiante = await getEstudiantesByIdaa(1)
        const colegio = await getColegiosByIdaa(estudiante.colegioId);
        console.log (estudiante, colegio);
    } catch (error) {
        console.log(error)
    }
}) ()
