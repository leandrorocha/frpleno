import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crud.css';

interface Conta {
    id: number;
    nome: string;
    descricao: string;
}

export const Crud = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    
    const [contas, setContas] = useState<Conta[]>([]);
    const [editingConta, setEditingConta] = useState<Conta | null>(null);

    useEffect(() => {
        fetchItems();
        
    }, []);

    const handleNomeChange = (event: any) => {
        setNome(event.target.value);
    };

    const handleDescricaoChange = (event: any) => {
        setDescricao(event.target.value);
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contas');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const novaConta = { nome, descricao };

        axios.post('http://localhost:5000/contas', novaConta)
            .then(response => {
                console.log('Conta criada com sucesso:', response.data);
                setNome('');
                setDescricao('');
            })
            .catch(error => {
                console.error('Erro ao criar a conta:', error);
            });
    };

    const handleEditClick = (item: Conta) => {
        setEditingConta(item);
    };

    const handleEditCancel = () => {
        setEditingConta(null);
    };

    const handleSaveEdit = async (editedConta: Conta) => {
        try {
            await axios.put(`http://localhost:5000/contas/${editedConta.id}`, editedConta);
            fetchItems();
            setEditingConta(null);
        } catch (error) {
            console.error('Erro ao editar conta:', error);
        }
    };

    const handleDelete = async (itemId: number) => {
        try {
            await axios.delete(`http://localhost:5000/contas/${itemId}`);
            fetchItems();
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
        }
    };


    return (
        <div className='crud'>
            <h2>2. Crud - Criar Conta</h2>
            <form onSubmit={handleSubmit} className='form-crud'>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" value={nome} onChange={handleNomeChange} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <input type="text" id="descricao" value={descricao} onChange={handleDescricaoChange} />
                </div>
                <div>
                    <button type="submit" style={{ width: '200px' }}>Criar Conta</button>
                </div>
            </form>

            <div className='linha'></div>

            <h2>2. Crud - Lista de Contas</h2>
            <ul>
                {contas.map((item) => (
                    <li key={item.id}>
                        {editingConta === item ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingConta.nome}
                                    onChange={(e) => setEditingConta(
                                        {

                                            ...editingConta, nome: e.target.value
                                        })
                                    }
                                />
                                <button onClick={() => handleSaveEdit(editingConta)}>Salvar</button>
                                <button onClick={handleEditCancel}>Cancelar</button>
                            </div>
                        ) : (
                            <div className='conta'>
                                (id: {item.id})
                                <strong>{item.nome}</strong>
                                -
                                <strong>{item.descricao}</strong>
                                <button onClick={() => handleEditClick(item)}>Editar</button>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

