import axios from 'axios';

const buscarCEP = async (cep: string) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Erro ao buscar o CEP.');
    }
};

export default buscarCEP;
