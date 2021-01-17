const puppeteer = require('puppeteer');

const usuario = '';
const senha = '';

(async function(){
    
    try{
        const browser = await puppeteer.launch({
            headless:false,
            ignoreHTTPSErrors:false,
            defaultViewport: null
            
        });
        
        const page = await browser.newPage();
        await page.goto("http://www14.fgv.br/autenticacao_produtos_licenciados/default.aspx");
        await page.click("#ctl00_content_txtLogin");
        await page.keyboard.type(usuario);

        await page.click("#ctl00_content_txtSenha");
        await page.keyboard.type(senha);
        await page.click("#ctl00_content_btnAuth");

        await page.click("#ctl00_content_rptProduto_ctl00_hpkProduto");

        const butRecadastrar = "#butRecadastrar";
        await page.waitForSelector(butRecadastrar, {visible: true});
        for(let x=1;x<3;x++){
            await page.waitForSelector(butRecadastrar, {visible: true});
            await page.click(butRecadastrar)
        }
        // await page.click('#butRecadastrar')
        // await page.evaluate(() => {
            // if(location.href === 'http://www14.fgv.br/fgvdados20/recadastrar.aspx'){
                // console.log(window.location.href)
                // document.getElementById('butRecadastrar').click()
            // }           
        // });
        // await new Promise(resolve => setTimeout(resolve, 900));
        // await page.waitForTimeout(1000);
        await page.goto('http://www14.fgv.br/fgvdados20/default.aspx')
        
        const dlsCatalogoFixo_imbOpNivelUm_2 = "#dlsCatalogoFixo_imbOpNivelUm_2";
        await page.waitForSelector(dlsCatalogoFixo_imbOpNivelUm_2, {visible: true});
        await page.click(dlsCatalogoFixo_imbOpNivelUm_2)
        
        
        
        const botao = "#cphConsulta_rbtSerieHistorica";
        await page.waitForSelector(botao, {visible: true});
        await page.click(botao)

        
        await page.click('#cphConsulta_rbtSerieHistorica')
        await page.evaluate(() => {
            document.querySelector('#dlsCatalogoFixo_imbOpNivelDois_3').click() 
            
        });
        // await page.waitForTimeout(500);
        await page.goto('http://www14.fgv.br/fgvdados20/consulta.aspx');
        var dlsmovelcorrente = "#dlsMovelCorrente_imbIncluiItem_0"
        await page.waitForSelector(dlsmovelcorrente, {visible: true});
        // await new Promise(resolve => setTimeout(resolve, 200));
        
        for (let i=2;i<4;i++){
            var dlsmovelcorrente = "#dlsMovelCorrente_imbIncluiItem_"+i;
            console.log(dlsmovelcorrente)
            await page.waitForSelector(dlsmovelcorrente, {visible: true});
            await page.waitForTimeout(500);
            await page.click("#dlsMovelCorrente_imbIncluiItem_"+i);
        }                                                   
        
        await page.click('#butCatalogoMovelFecha')
        
        await page.click('#cphConsulta_chkEscolhida')
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        const bt_VisResultados = "#cphConsulta_butVisualizarResultado";
        // for(let i=0;i<3;i++){
        await page.waitForSelector(bt_VisResultados, {visible: true});
        // await page.click(bt_VisResultados)
        // }

        
                
        await page.evaluate(() => {
            setTimeout(()=>{
                document.getElementById('cphConsulta_butVisualizarResultado').click()
                                    
            },5000)                                     
        });

        // await page.goto('http://www14.fgv.br/fgvdados20/visualizaconsulta.aspx')
        await page.goto('http://www14.fgv.br/fgvdados20/VisualizaConsultaFrame.aspx');
        
        await page.waitForSelector('#lbtSalvarCSV', {visible: true})
        await page.click('#lbtSalvarCSV')
        await page.waitForTimeout(2500);

        await browser.close();     
                
        console.log('download concluido')
        
                       
    
    } catch (e){
        console.log('Deu ruim: \n',e);
    }

})();

