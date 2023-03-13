//Importar UseState
import { useState } from "react";

//Componente
function Tabela({vetor, selecionar}){
    //State
    const [termo,setTermo] = useState('');

    //Retorno
    return(
        <div>
            <input type='text' onChange={e => setTermo(e.target.value)} className="form-control pesquisa" placeholder="Buscar no arquivo morto" />
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Pasta</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        vetor.filter(obj => obj.nome.includes(termo)).map((obj, indice) =>(
                            <tr key={indice}>
                                <td>{indice+1}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.cpf}</td>
                                <td>{obj.pasta}</td>
                                <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Tabela;