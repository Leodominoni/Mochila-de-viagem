const form = document.getElementById('novoItem');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
     //aqui teremos o conflito q recebe uma string

    criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value);
});

function criaElemento(nome, quantidade){
    console.log(nome, quantidade);

    const novoItem = document.createElement('li'); //Vai pegar um item da lista
    novoItem.classList.add('item'); //adicionar a classe item

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    console.log(novoItem)
}