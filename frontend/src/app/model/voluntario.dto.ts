export interface VoluntarioMinDTO {
    nome: string;
    dataNascimento: string;
}

export interface VoluntarioDTO {
    nome: string;
    dataNascimento: string;
    cpf: string;
    email: string;
    telefone: string;
}

export interface AtualizarVoluntarioDTO {
    nome?: string;
    telefone?: string;
    cpf?: string;
    dataNascimento?: string;
}

