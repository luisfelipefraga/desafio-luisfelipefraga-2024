class RecintosZoo {
    constructor() {
        this.recintos = [
          { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
          { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
          { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
          { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
          { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        
        this.animais = {
          LEAO: { tamanho: 3, biomas: ['savana'] },
          LEOPARDO: { tamanho: 2, biomas: ['savana'] },
          CROCODILO: { tamanho: 3, biomas: ['rio'] },
          MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
          GAZELA: { tamanho: 2, biomas: ['savana'] },
          HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
        };
      }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
          }

          if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
          }
      
          const tamanhoAnimal = this.animais[animal].tamanho * quantidade;
          const biomasPermitidos = this.animais[animal].biomas;
          const recintosViaveis = [];
      
          this.recintos.forEach((recintos) => {
            const espacoOcupado = this.calcularEspacoOcupado(recintos);
            const espacoDisponivel = recintos.tamanho - espacoOcupado;
            const biomaEhPermitido = biomasPermitidos.includes(recintos.bioma) || recintos.bioma.includes(biomasPermitidos[0]);
            
            if (biomaEhPermitido && espacoDisponivel >= tamanhoAnimal) {
              if (this.podeAdicionarNoRecinto(recintos, animal)) {
                recintosViaveis.push({
                  numero: recintos.numero,
                  espacoLivre: espacoDisponivel - tamanhoAnimal,
                  total: recintos.tamanho
                });
              }
            }
          });
      
          if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
          }
      
          return { recintosViaveis: recintosViaveis.map(recintos => `Recinto ${recintos.numero} (espaço livre: ${recintos.espacoLivre} total: ${recintos.total})`) };
        }
        //C
        calcularEspacoOcupado(recinto) {
          let espacoOcupado = 0;
          recinto.animais.forEach(animal => {
            const tamanhoAnimal = this.animais[animal.especie].tamanho;
            espacoOcupado += tamanhoAnimal * animal.quantidade;
          });
        
          // Adicionar espaço extra se houver mais de uma espécie
          if (recinto.animais.length > 1) {
            espacoOcupado += 1;
          }
        
          return espacoOcupado;
        }
        podeAdicionarNoRecinto(recintos, animal) {
          const animaisExistentes = recintos.animais.map(a => a.especie);
          
          if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
            return animaisExistentes.length === 0;
          } else if (animaisExistentes.includes('LEAO') || animaisExistentes.includes('LEOPARDO') || animaisExistentes.includes('CROCODILO')) {
            return false;
          }else if (animal === 'HIPOPOTAMO' && this.recintos.bioma != 'savana e rio') {
            return false;
          } else {
            return true;
          }
        }
    
}
export { RecintosZoo as RecintosZoo };
