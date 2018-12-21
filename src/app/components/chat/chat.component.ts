import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor(private _cs: ChatService) {

    this._cs.cargarMensajes()
        .subscribe(() => {
          setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 20);
        });
   }

   ngOnInit() {
     this.elemento = document.getElementById('app-mensajes');
   }

  enviarMensaje() {
    console.log(this.mensaje);

    if ( this.mensaje.length === 0 ) {
        return;
    }

    this._cs.agregarMensaje( this.mensaje )
        .then( () => this.mensaje = '')
        .catch((error) => console.error('Error al enviar!!', error));
  }

}
