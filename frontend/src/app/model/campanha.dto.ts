import { LocalResponse } from "./local.dto";

export interface CampanhaDTO {
    campanhaId: number;
    nome: string;
    descricao: string;
    dataInicio: string; 
    dataFim: string;    
    metaFundos: number;
    fundosArrecadados: number;
    qtdInscritos: number;
    localDTO: LocalResponse;
}

export interface CampanhaMinDTO {
    campanhaId: number;
    nome: string;
    dataFim: string;       
    metaFundos: number;
    fundosArrecadados: number;
    qtdInscritos: number;
    localNome: string;
    cidadeNome: string;
    estadoSigla: string;
}

export interface CriarCampanhaDTO {
    nome: string;
    descricao: string;
    dataInicio: string; 
    dataFim: string;    
    metaFundos: number;
    localId: number;
}

export interface EstenderPrazoDTO {
    novaDataFim: string;
}

export interface DoacaoDTO {
    valor: number;
}
