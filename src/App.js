import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto Arquivo
  const arquivo  = {
    codigo : 0,
    nome: '',
    cpf: '',
    pasta: ''
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [arquivos, setArquivos] = useState([]);
  const [objArquivo, setObjArquivo] = useState(arquivo);

  //UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setArquivos(retorno_convertido));
  }, []);

  //Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjArquivo({...objArquivo, [e.target.name]:e.target.value});
  }

  //Cadastrar arquivo
  const cadastrar = () =>{
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objArquivo),
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setArquivos([...arquivos, retorno_convertido]);
        alert('Adicionado(a) com sucesso!');
        limparFormulario();
      }
    })
  }

   //Alterar arquivo
   const alterar = () =>{
    fetch('http://localhost:8080/alterar',{
      method:'put',
      body:JSON.stringify(objArquivo),
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        //Mensagem
        alert('Alterado(a) com sucesso!');

        //Cópia do vertor de arquivos
        let vetorTemp = [...arquivos];

        //Índice
        let indice = vetorTemp.findIndex((a) =>{
          return a.codigo === objArquivo.codigo;
        });

        //Alterar arquivo do vetorTemp
        vetorTemp[indice] = objArquivo;

        //Atualizar vetor de produtos
        setArquivos(vetorTemp);

        //Limpar formulário
        limparFormulario();
      }
    })
  }

  //Remover arquivo
  const remover = () =>{
    fetch('http://localhost:8080/remover/'+objArquivo.codigo,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      //Mensagem 
      alert(retorno_convertido.mensagem);

      //Cópia do vertor de arquivos
      let vetorTemp = [...arquivos];

      //Índice
      let indice = vetorTemp.findIndex((a) =>{
        return a.codigo === objArquivo.codigo;
      });
      //Remover arquivo do vetorTemp
      vetorTemp.splice(indice, 1);

      //Atualizar vetor de produtos
      setArquivos(vetorTemp);

      //Limpar formulário
      limparFormulario();
    })
  }

  //Limpar formulário
  const limparFormulario = () => {
    setObjArquivo(arquivo);
    setBtnCadastrar(true);
  }
  
  

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjArquivo(arquivos[indice]);
    setBtnCadastrar(false);
  }

  //Retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objArquivo} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={arquivos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
