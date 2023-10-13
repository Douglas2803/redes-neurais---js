var train = true;
var nn;
var dataset;

function executa() {
  nn = new RedeNeural(2, 3, 1);

  // XOR Problem
  dataset = {
    inputs: [
      [1, 1],
      [1, 0],
      [0, 1],
      [0, 0]
    ],
    outputs: [
      [0],
      [1],
      [1],
      [0]
    ]
  }

  while (train) {
    for (var i = 0; i < 10000; i++) {
      var index = Math.floor(Math.random() * 4);
      nn.train(dataset.inputs[index], dataset.outputs[index]);
    }
    if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
      train = false;
      console.log("terminou");
    }
  }

  // Exemplo de como exibir algo na div "csvData"
  document.getElementById("csvData").textContent = "Treinamento concluído.";
}

function lerArquivoCSV(arquivo) {
  const leitor = new FileReader();

  leitor.onload = function (evento) {
    const conteudo = evento.target.result;
    converterCSVparaArray(conteudo);
  };

  leitor.readAsText(arquivo);
}

function converterCSVparaArray(conteudoCSV) {
  const linhas = conteudoCSV.split('\n');
  var arrayCSV = [];

  linhas.forEach(function (linha) {
    // Substitui ponto e vírgula por vírgula na linha
    linha = linha.replace(/;/g, ',');
    const valores = linha.split(',');
    if (valores.length > 0) { // Verifica se a linha não está vazia
      arrayCSV.push(valores);
    }
  });
  
  var arrayCSV
   = drop(arrayCSV
    );
  console.log(arrayCSV);

}
function drop(arrayCSV
  ){
      var indice = 0;
      while(arrayCSV
        [indice] != undefined){
        arrayCSV
        [indice].splice(3,6);
        arrayCSV
        [indice].splice(0,1);
        indice++;
      }
      return arrayCSV
      ;
}
