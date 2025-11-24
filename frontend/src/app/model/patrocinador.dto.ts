export interface PatrocinadorMinDTO {
    nomeFantasia: string;
    razaoSocial: string;
}

export interface PatrocinadorDTO {
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    email: string;
    telefone: string;
}

export interface AtualizarPatrocinadorDTO {
    nomeFantasia?: string;
    razaoSocial?: string;
    cnpj?: string;
    telefone?: string;
}