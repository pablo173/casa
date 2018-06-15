import { Component } from '@angular/core';

//TODO: importamos refresher y reorderarray de ionic
import { NavController, Refresher, reorderArray } from 'ionic-angular';


//TODO: importamos nuestra constante e interface
import { ANIMALES } from '../../data/data.animales';
import { AnimalInterface } from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //TODO: variables de la clase
  animals:AnimalInterface[]=[];  // creamos un array del tipo AnimalInterface y lo inicializamos vacío
  audio = new Audio();           // creamos un objeto de tipo audio (para los metodos load y play)
  durationAudio:any;             // para usar en la duración de reproducción del audio
  order:boolean=false;           // para determinar si tenemos ordenada la lista


  constructor(public navCtrl: NavController) {

    // TODO: clonamos el contenido de nuestra constante animals 
    // TODO: para pasarlo a nuestro objeto "animales" que está vacío
    this.animals = ANIMALES.slice(0);

  }

  // TODO: método para reproducir un audio
  play(animal:AnimalInterface){

    this.pauseAudio(animal);

    // TODO: con una estructura if preguntamos 
    // TODO: si estamos reproduciendo el audio

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    //TODO: pintamos en la consola el animal
    console.log(animal);

    this.audio.src = animal.audio;  // TODO: obtenemos ruta del audio
    this.audio.load();              // TODO: cargamos el audio
    this.audio.play();              // TODO: reproducimos el audio

    //TODO: volvemos a dejar el estado de reproducción en true 
    animal.reproduciendo = true;

    // TODO: Usamos el método settimeout para establecer 
    // TODO: la duración del audio
    this.durationAudio = setTimeout(()=> animal.reproduciendo =false, animal.duracion * 1000 );


  }

  // TODO: método para pausar el audio
  private pauseAudio(animalSel:AnimalInterface){

    //TODO: limpiamos el settimeout que contiene 
    // tODO: la duración de un audio
    clearTimeout(this.durationAudio);
    //TODO: pausamos el audio
    this.audio.pause();
    // TODO: establecemos a cero la duración del audio 
    // TODO: usando el método currenttime
    this.audio.currentTime=0;

    // TODO: recorremos toda la colección de animales 
    // TODO: para comparar si el animal que tenemos seleccionado 
    // TODO: no es igual al animal de la lista
    for(let animal of this.animals){
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }
 
  }

 // TODO: método que modifica la lista simulando 
    // TODO: eliminación de un elemento
    deleteItem(index:number){
      this.animals.splice(index,1);

  }

}
