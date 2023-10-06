import axios from "axios"
import { useState } from "react"
import './buscacep.css';

export const BuscaCep = () => {
    const [busca, setBusca] = useState("")
    const [result, setResult] = useState<any>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusca(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://viacep.com.br/ws/${busca}/json/`);
            setResult(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="form-busca-cep">
            <h2>1. Busca de endereços por CEP</h2>

            <form onSubmit={handleSubmit} className="formulario">
                <input
                    type="text"
                    name={busca}
                    onChange={handleInputChange}
                    placeholder="Digite o CEP"
                />

                <button type="submit">Pesquisar</button>
            </form>

            {result &&  (
                <div className="resultados-busca">
                    <h2>Resultados:</h2>

                    <p>Logradouro: {result.logradouro}</p>
                    <p>Complemento: {result.complemento}</p>
                    <p>Bairo: {result.bairro}</p>
                    <p>Estado/UF: {result.localidade} -  {result.uf}</p>
                </div>
            )}
            
        </div>
    )
}