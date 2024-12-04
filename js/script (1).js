document.getElementById("formcadastro").addEventListener("submit", function (event) {

    event.preventDefault();//
    var nome = document.getElementById('nome').value;
    var categoria = document.getElementById('categoria').value;
    var data = document.getElementById('data').value;
    var valor = parseFloat(document.getElementById('valor').value);

    var cadastrar = { nome: nome, categoria: categoria, data: data, valor: valor };
    var lista_receita = JSON.parse(localStorage.getItem('lista_receita')) || [];

    lista_receita.push(cadastrar);

    localStorage.setItem('lista_receita', JSON.stringify(lista_receita));
    document.getElementById('formcadastro').reset();
    exibir_receita();
    exibir_resumo();
});
    
    function formatarMoeda(valor) {

        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    function exibir_receita() {

        const lista_receita = JSON.parse(localStorage.getItem('lista_receita')) || [];
        const output = document.getElementById('output');
        output.innerHTML = '';
    
        for (let index = 0; index < lista_receita.length; index++) {
            const item = lista_receita[index];
            const li = document.createElement('li');
            li.textContent = `Nome: ${item.nome}, Categoria: ${item.categoria}, Data: ${item.data}, Valor: ${formatarMoeda(item.valor)}`;
    
            // Botão de excluir
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluir_transacao(index));
    
            // Botão de editar com três pontinhos
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = '•••';
            btnEditar.classList.add('edit-btn');
            btnEditar.addEventListener('click', () => editar_transacao(index));
    
            li.appendChild(btnExcluir);
            li.appendChild(btnEditar);
            output.appendChild(li);
        }
    }
    
    function excluir_transacao(index) {//Funciona o botão de excluir
        const lista_receita = JSON.parse(localStorage.getItem('lista_receita')) || [];
        lista_receita.splice(index, 1);
        localStorage.setItem('lista_receita', JSON.stringify(lista_receita));
        exibir_receita();
        exibir_resumo();
    }
    
    function editar_transacao(index) {
        const lista_receita = JSON.parse(localStorage.getItem('lista_receita')) || [];
        const item = lista_receita[index];
    
        // Preenchendo o formulário com os dados da transação a ser editada
        document.getElementById('nome').value = item.nome;
        document.getElementById('categoria').value = item.categoria;
        document.getElementById('data').value = item.data;
        document.getElementById('valor').value = item.valor;
    
        // Remover item antigo e fazer novo cadastro ao enviar o formulário
        lista_receita.splice(index, 1);
        localStorage.setItem('lista_receita', JSON.stringify(lista_receita));
        exibir_receita();
        exibir_resumo();
    }
    
    function exibir_resumo() {
        const lista_receita = JSON.parse(localStorage.getItem('lista_receita')) || [];
        let totalReceitas = 0;
        let totalDespesas = 0;
    
        for (let index = 0; index < lista_receita.length; index++) {
            const item = lista_receita[index];
            if (item.categoria == 'receita') {
                totalReceitas += parseFloat(item.valor);
            } else {
                totalDespesas += parseFloat(item.valor);
            }
        }
    
        document.getElementById('totalReceitas').textContent = formatarMoeda(totalReceitas);
        document.getElementById('totalDespesas').textContent = formatarMoeda(totalDespesas);
        document.getElementById('saldoFinal').textContent = formatarMoeda(totalReceitas - totalDespesas);
    }
    
    // Carregar dados ao iniciar a página
    document.addEventListener("DOMContentLoaded", function () {
        exibir_receita();
        exibir_resumo();
    });