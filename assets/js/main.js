const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens  =  JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach((elemento)=>{
    criaElemento(elemento);
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
   
    const existe = itens.find(elemento => elemento.nome === nome.value) //buscar elemento e ver se existe um igual

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);//add item no array
    }
    
    localStorage.setItem('itens', JSON.stringify(itens)); //transformar objeto em string

    nome.value = '';
    quantidade.value = '';
});

function criaElemento(item){
    const novoItem = document.createElement('li'); //Vai pegar um item da lista
    novoItem.classList.add('item'); //adicionar a classe item

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id ))
    
    lista.appendChild(novoItem);  
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}
function botaoDeleta(){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X'; //aparece o X

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode);
    })

    return elementoBotao;
}
function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}