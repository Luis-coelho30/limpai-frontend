export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  accesstoken: string;
  userId: number;
  username: string;
}

export interface RegisterVoluntarioRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone: string;
}

export interface RegisterPatrocinadorRequest {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  senha: string;
  telefone: string;
}