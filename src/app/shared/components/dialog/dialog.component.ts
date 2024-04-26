import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData{
  telefone: string,
  cachorro_nome: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  copyPhoneNumber() {
    const el = document.createElement('textarea');
    el.value = this.data.telefone;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Telefone copiado para a área de transferência!');
  }

  openWhatsApp() {
    const phoneNumber = this.data.telefone;
    const message = 'Olá, gostaria de falar sobre o cachorro.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }


}
