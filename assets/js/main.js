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
    } else {
        itemAtual.id = itens.length;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }
    
    criaElemento(itemAtual);

    itens.push(itemAtual); //add item no array

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
    
    lista.appendChild(novoItem);  
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}