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
    linha = linha.replace(/\r/g, '');
    // linha = linha.replace(/H/g, '[1,0,0]').split(0,8);
    const valores = linha.split(',');
    if (valores.length > 0) { // Verifica se a linha não está vazia
      arrayCSV.push(valores);
    }
  });
  
  drop(arrayCSV);
  arrayCSV.shift();
  console.log(arrayCSV);

  console.log(convert(arrayCSV));

}
// Dropa as colunas que eu não tenho interesse
function drop(arrayCSV){
      var indice = 0;

      while(arrayCSV[indice] != undefined){
        arrayCSV[indice].splice(0,8);
        indice++;
      }

      return arrayCSV;
}

// Função para converter o vencendor em numérioco

function convert(arrayCSV){
  var vitoriaMatriz = [];
  var indice = 0;
  while(arrayCSV[indice] != undefined){
    if (arrayCSV[indice][0]==="H"){
      vitoriaMatriz[indice] = [1,0,0]; 
    }

    if (arrayCSV[indice][0]==="D") {
      vitoriaMatriz[indice] = [0,1,0]; 
    }else{
      vitoriaMatriz[indice] = [0,0,1]; 
    }

    indice++;
  }
  return vitoriaMatriz;
}
