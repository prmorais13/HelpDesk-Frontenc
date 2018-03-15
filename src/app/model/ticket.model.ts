import { User } from './user.model';

export class Ticket {
  constructor(
    public id: string,
    public numero: number,
    public titulo: string,
    public status: string,
    public prioridade: string,
    public imagem: string,
    public usuario: User,
    public usuarioAtribuido: User,
    public alteracoes: Array<string>

  ) {}
}
