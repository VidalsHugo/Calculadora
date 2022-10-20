const result = document.querySelector('#result-container');
const buttons = document.querySelectorAll('.botao');
let value = '';
let max = 15;

//função para calcular resposta, de string para expressão
function equal() {
    let value = result.textContent;
    let resultado = eval(value)

    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    //Numeros quebrados até no maximo 3 casas decimais
    if(parseInt(resultado) != parseFloat(resultado)){
        //adiciona o resultado na tela
        result.innerText = resultado.toFixed(3);
    }else{
        //adiciona o resultado na tela
        result.innerText = resultado;
    }
}
//função para adicionar texto
function addText() {
    let text = document.createTextNode(value);
    result.appendChild(text);
}
//funcao para apagar o ultimo digito
function del() {
    let lastC = result.innerText.length - 1;
    result.innerText = result.innerText.substring(0, result.innerText.length - 1);
}
//funcao para apagar tudo
function allDel() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

//criando eventos em todos os botões
buttons.forEach((e) => {
    let maisOuMenos = 1;
    e.addEventListener('click', (element) => {
        value = element.target.innerText;

        //verificando primeiro digito
        if (result.innerText.length < 1) {
            if (value == '/'
                || value == '*'
                || value == '-'
                || value == '+'
                || value == '='
                || value == '+/-'
                || value == '.'
                || value == 'AC'
                || value == 'C') {
                console.log('erro');
            } else {
                addText();
            }
        } else {
            let error = result.innerText[result.innerText.length - 1]
            //verificando se o ultimo digito é incompativel com o próximo
            if ((error == '/'
                || error == '*'
                || error == '-'
                || error == '+'
                || error == '='
                || error == '.') &&
                (value == '/'
                    || value == '*'
                    || value == '-'
                    || value == '+'
                    || value == '='
                    || value == '.')) {
                console.log('error')
            // verifica se atingiu numero maximo de digitos
            } else if (result.innerText.length == max) {
                if (value == 'C') {
                    del();
                } else if (value == 'AC') {
                    allDel();
                }
                console.log('erro, tamanho maximo atingido')
            }
            //apertou Igual
            else if (value == '=') {
                equal();

                //clicou em +/-
            } else if (value == '+/-') {
                //passa para negativo
                if (result.innerText[0] != '-') {
                    let menos = '-';
                    result.innerText = menos + result.innerText;
                    maisOuMenos--;
                    //passa para positivo
                } else if (result.innerText[0] == '-') {
                    result.innerText = result.innerText.replace(result.innerText[0], ' ');
                    maisOuMenos++;
                }
                //clicou em AC 'ALL CLEAR'
            } else if (value == 'AC') {
                allDel();
                //clicou em C 'CLEAR'
            } else if (value == 'C') {
                del();
            }
            //digito qualquer
            else {
                addText();
            }
        }

    });
});
