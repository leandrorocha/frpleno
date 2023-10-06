import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BuscaCep } from "."
import buscarCEP from '../utis/cepUtils';

jest.mock('axios');

const mockAxios = new MockAdapter(axios);

describe("<BuscaCep />", () => {
    test('render a button form', () => {
        render(<BuscaCep />);

        const name = screen.getByText("Pesquisar");

        expect(name).toBeInTheDocument();
    });

    test('deve buscar as informações do CEP corretamente', async () => {
        const cep = '72145616';
        const mockResponse = {
            cep: "72145-616",
            logradouro: "QNM 36 Conjunto P",
            complemento: "",
            bairro: "Taguatinga Norte (Taguatinga)",
            localidade: "Brasília",
            uf: "DF",
            ibge: "5300108",
            gia: "",
            ddd: "61",
            siafi: "9701"
        };
        mockAxios.onGet(`https://viacep.com.br/ws/${cep}/json/`).reply(200, mockResponse);

        const resultado = await buscarCEP(cep);

        expect(resultado).toEqual(mockResponse);
    });
});