import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  mensagens: string[] = ['Analisando imagens...', 'Gerando resultados...', 'Calculando semelhanças...'];
  mensagemAtual: string = this.mensagens[0];
  mensagemIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    // Inicia a troca de mensagens em um intervalo de tempo
    this.intervalId = setInterval(() => {
      this.mensagemIndex = (this.mensagemIndex + 1) % this.mensagens.length;
      this.mensagemAtual = this.mensagens[this.mensagemIndex];
    }, 3000); // Troca de mensagem a cada 3 segundos (ajuste conforme desejado)
  }

  ngOnDestroy() {
    // Limpa o intervalo quando o componente é destruído
    clearInterval(this.intervalId);
  }

}
