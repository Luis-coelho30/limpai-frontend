export interface LocalRequest {
  nome: string;
  endereco: string;
  cep: string; 
  cidadeId: string; 
}

export interface LocalResponse {
  localId: number;
  nome: string;
  endereco: string;
  cep: string; 
  cidadeId: string; 
  cidadeNome: string;
  estadoSigla: string;
}