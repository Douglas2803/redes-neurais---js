var train = true;
var nn;
var dataset;
var globalArrays = {
  arrayoitenta: [],
  arrayvinte: [],
  arrayvitoria: [],
  
};

function executa() {
  nn = new RedeNeural(12, 3, 3);

  while (train) {
    // treina 10 mil vezes com indices randomicos  com 80% dos dados
    for (var i = 0; i < 1000; i++) {
      var index = Math.floor(Math.random() * 4864);
      nn.train(globalArrays.arrayoitenta[index], globalArrays.arrayvitoria[index]);
    }

    // Recupere a saída da rede neural
const saidaRedeNeural = nn.predict(globalArrays.arrayoitenta);

// Defina os três arrays de referência
const arrayReferencia1 = [0.98, 0, 0];
const arrayReferencia2 = [0, 0.98, 0];
const arrayReferencia3 = [0, 0, 0.98];

// Inicialize variáveis para rastrear se as comparações são verdadeiras para cada array de referência
let comparação1 = false;
let comparação2 = false;
let comparação3 = false;


  if (saidaRedeNeural[0] <= arrayReferencia1[0]) {
    comparação1 = true;
  }
  if (saidaRedeNeural[2] <= arrayReferencia2[1]) {
    comparação2 = true;
  }
  if (saidaRedeNeural[3] <= arrayReferencia3[2]) {
    comparação3 = true;
  }


if (comparação1 && comparação2 && comparação3) {
  train = false;
  console.log("terminou");
} else {
  console.log("A saída da rede neural não atende aos critérios de nenhum dos arrays de referência.");
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
    linha = linha.replace(/;/g, ',');
    linha = linha.replace(/\r/g, '');
    const valores = linha.split(',');
    if (valores.length > 0) {
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