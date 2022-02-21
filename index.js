const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

app.get('/', async (req, res) => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  //Definimos um userAgent para o Chromium abrir no modo Desktop de visualização  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  await page.setViewport({
    width: 1366,
    height: 768
    });

  await page.goto('https://www.novaera.mg.gov.br/servidores-por-nomes');
  await delay(9000);
  const linha = 10;

  //console.log('Navegando até PMNE')
  

  const pageData = await page.evaluate(() => {

    
  
     const Titulo = $('.#lbl_rotuloLocal').text()
     const Competencia = $('.#conteudo > div.content-body.col-xs-12.col-md-12.col-sm-12.col-lg-12 > div.tpc-filtro-detalhe > span:nth-child(2)').Text()
     const MatriculaServ = document.querySelector('#datatable > tbody > tr:nth-child(1) > td.sorting_1').innerText
     const NomeServ = document.querySelector('#datatable > tbody > tr:nth-child(1) > td.sorting_2').innerText
     const Departamento = document.querySelector('#datatable > tbody > tr:nth-child(1) > td:nth-child(3)').innerText
     const CargoFun = document.querySelector('#datatable > tbody > tr:nth-child(1) > td:nth-child(4)').innerText
     const Vinculo = document.querySelector('#datatable > tbody > tr:nth-child(1) > td:nth-child(5)').innerText
     const Tipo = document.querySelector('#datatable > tbody > tr:nth-child(1) > td:nth-child(6)').innerText
     const Valor = document.querySelector('#datatable > tbody > tr:nth-child(1) > td:nth-child(7)').innerText

    return {

    Titulo: Titulo,
    Competencia: Competencia,
    MatriculaServ: MatriculaServ,
    NomeServ: NomeServ,
    Departamento: Departamento,
    CargoFun: CargoFun,
    Vinculo: Vinculo,
    Tipo: Tipo,
    Valor: Valor,
    };
  });

  

  await browser.close();

  res.send({
    "Titulo Da Pagina": pageData.Titulo,
    "Competencia": pageData.Competencia,
    "Matricula Servidores": pageData.MatriculaServ,
    "Nome Do Servidor": pageData.NomeServ,
    "Departamento": pageData.Departamento,
    "Cargo/Função": pageData.CargoFun,
    "Vinculo": pageData.Vinculo,
    "Tipo": pageData.Tipo,
    "Valor": pageData.Valor

  })

});

app.listen(3000);

function newFunction() {
    return 10;
}
