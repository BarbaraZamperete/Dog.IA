import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
  ){}

  copyPhoneNumber() {
    const el = document.createElement('textarea');
    el.value = this.data.telefone;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.openSnackBar("Telefone copiado para a área de transferência!", "success")
  }

  openWhatsApp() {
    const phoneNumber = this.data.telefone;
    const message = 'Olá, gostaria de falar sobre o cachorro.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }


}
