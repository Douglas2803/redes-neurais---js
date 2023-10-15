var train = true;
var nn;
var dataset;
var globalArrays = {
  arrayoitenta: [],
  arrayvinte: [],
  arrayvitoria: [],
  
};

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
      var index = Math.floor(Math.random() * 4864);
      nn.train(globalArrays.arrayoitenta[index], globalArrays.arrayvitoria[index]);
    }

    if (nn.predict(globalArrays.arrayoitenta)[0] > [0.98,0,0] && nn.predict(globalArrays.arrayoitenta)[2] > [0,0.98,0]
    && nn.predict(globalArrays.arrayoitenta)[3] > [0,0,0.98]){
      train = false;
      console.log("terminou");
    }

    if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
      train = false;
      console.log("terminou");
    
  }
}
  // while (train) {
  // for (var i = 0; i < 10000; i++) {
  //   var index = Math.floor(Math.random() * 4);
  //   nn.train(dataset.inputs[index], dataset.outputs[index]);
  //   }
  //   if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
  //     train = false;
  //     console.log("terminou");
  //   }
  // }

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
  arrayvitoria = convert(arrayCSV);
  dropFirsColumn(arrayCSV);
  var arrays = dropTreino(arrayCSV);
  arrayoitenta = arrays[0];
  arrayvinte = arrays[1];
  globalArrays.arrayoitenta = arrays[0];
  globalArrays.arrayvinte = arrays[1];
  globalArrays.arrayvitoria = arrayvitoria;


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

function dropFirsColumn(arrayCSV){
      var indice = 0;

      while(arrayCSV[indice] != undefined){
        arrayCSV[indice].splice(0,1);
        indice++;
      }

      return arrayCSV;
}

function dropTreino(array){
  x = 0;
  cont = 0;
  var arrayoitenta = [];
  var arrayvinte = [];

  while(array[x] != undefined){
    cont++;
    x++;
  }
  oitenta = cont*0.8;

  for (let i = 0; i < oitenta; i++) {
    arrayoitenta[i] = array[i];
  }

  var contvinte = oitenta;

  while(array[contvinte] != undefined){
    arrayvinte[contvinte] = array[contvinte];
    contvinte++;
  }

  return [arrayoitenta,arrayvinte];
}

// Função para converter o vencendor em numérioco

function convert(arrayCSV){
  var vitoriaMatriz = [];
  var indice = 0;
  while(arrayCSV[indice] != undefined){
    if (arrayCSV[indice][0]==="H"){
      vitoriaMatriz[indice] = [1,0,0]; 
    }
    else if (arrayCSV[indice][0]==="D") {
      vitoriaMatriz[indice] = [0,1,0]; 
    }else{
      vitoriaMatriz[indice] = [0,0,1]; 
    }

    indice++;
  }
  return vitoriaMatriz;
}