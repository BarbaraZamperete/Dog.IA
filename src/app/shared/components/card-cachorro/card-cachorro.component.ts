import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CachorroService } from '../../../services/cachorro.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-card-cachorro',
  templateUrl: './card-cachorro.component.html',
  styleUrl: './card-cachorro.component.scss'
})
export class CardCachorroComponent {

  @Input() cachorros: any[]
  @Input() acao: string
  @Input() botaoNome: string
  @Input() tipo: number = 1
  dashboard: boolean = false

  constructor(
    private router: Router,
    private cachorroService: CachorroService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dashboard = this.router.url=="/dashboard" ? true : false;
  }

  onAction(id:any, combinacao:any) {
    this.acao == "resultados" ? this.verResultados(id) : this.onContact(combinacao)
  }

  onContact(combinacao: any) {
    const telefone =combinacao.id_buscado.tutor_telefone
    console.log(telefone)
    this.openDialog('3000','1500', {telefone: telefone, cachorro: combinacao.id_buscado.nome})

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data:any): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data
    });
  }

  verResultados(id:any) {
    this.router.navigate(['resultados', id])
  }

  changeStatus(id: number, nome: string){
    const confirmed = confirm(`Deseja realmente alterar o status de ${nome} para encontrado?`)
    if(confirmed){
      this.cachorroService.changeStatus(id, false).subscribe(res => {
        window.location.reload()
        this.openSnackBar("Cachorro alterado para Encontrado", "success")
      })
    }

  }

  openSnackBar(mesage:string, tipo:string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: mesage, tipo: tipo},
      duration: 2000, // Tempo em milissegundos para o Snackbar desaparecer
    });
  }
}
