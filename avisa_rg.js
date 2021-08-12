// Script para me avisar quando surgir uma vaga para a cidade de Santa Maria para que eu possa agendar meu RG, pois tá foda

// Variáveis globais
let notifica = true;
let notificado = 0;
let cnt_change = 0;

// Data a ser enviada no body
let post_data = { 

   '__RequestVerificationToken': 'rF_gJUzjl1Aer21Ns2D-KXJ3CWr5WocOkMKi8vPNHZMLqeX8vfY0is6rC_McujNSqxx36Jz0bokkdyw8rMF2U4lj9Y41'
   ,'servicoId': 2
   ,'OrgaoId': 0

}

let url_endpoint = 'https://agendaservico.pcdf.df.gov.br/CarteiraIdentidade/DataHandler'

let nome_cidade_1 = 'santa'.toLowerCase();
let nome_cidade_2 = 'maria'.toLowerCase();

// Efetuar post para o endpoint que retorna os horários

const start_post = setInterval(()=>{
    $.post(url_endpoint, post_data, (response)=>{
        
        horarios = response['data']
    
        console.log(horarios);

        horarios.map((l)=>{

            let u_a = l.OrgaoExecutorJsonString.toLowerCase();
            console.log(u_a);

            if ( (u_a.search(nome_cidade_1) > -1 || u_a.search(nome_cidade_2) > -1) && notifica){
                notificado += 1;
                console.log("Chamando a função notificaFavicon()")
                notificaFavicon();
            }
          
        })
        
    })
}, 1000)

function notificaFavicon(){

    let body = $('body');

    let sound_html = '<audio><source src="https://www.myinstants.com/media/sounds/giornos-theme-but-only-the-best-part-is-in_vwd15lya_lyb0-online-audio-converter.mp3" type="audio/mpeg"></audio>';

    body.append(sound_html);

    (function myLoop() {     
        
      setTimeout(function() {   
        
          $('audio')[0].play();
          
          if (notifica){
              console.log("Chamando função myLoop pois aconteceu uma mensagem e ele não está vendo a tela!")
              myLoop();            
        }                    
      }, 200)
    })()
    
}

const verificaUsuario = setInterval(()=>{
    // SE O USUÁRIO NÃO ESTIVER VENDO A TELA
    if (document.hidden) {
        notifica = true;
        console.log(`Notifica --> '${notifica}', o usuário não está vendo a tela! `);
        
    } else {
        // SE O USUÁRIO ESTIVER VENDO A TELA
        notificado = 0;
        notifica = false;
        console.log(`Notifica --> '${notifica}', o usuário está vendo a tela! `);

    }

}, 1500)

