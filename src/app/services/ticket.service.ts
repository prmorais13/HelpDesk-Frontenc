import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../model/ticket.model';
import { HELP_DESK_API } from './helpdesk-api';

@Injectable()
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id !== null && ticket.id !== '') {
      return this.http.put(`${HELP_DESK_API}/api/tickets`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'NOVO';
      return this.http.post(`${HELP_DESK_API}/api/tickets`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}/api/tickets/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${HELP_DESK_API}/api/tickets/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${HELP_DESK_API}/api/tickets/${id}`);
  }

  findByParams(page: number, count: number, atribuidoAMim: boolean, ticket: Ticket) {
    ticket.numero = ticket.numero === null ? 0 : ticket.numero;
    ticket.titulo = ticket.titulo === '' ? 'uninformed' : ticket.titulo;
    ticket.status = ticket.status === '' ? 'uninformed' : ticket.status;
    ticket.prioridade = ticket.prioridade === '' ? 'uninformed' : ticket.prioridade;
    return this.http.get(`${HELP_DESK_API}/api/tickets/${page}/${count}/
                          ${ticket.numero}/${ticket.titulo}//${ticket.status}/
                          ${ticket.prioridade}/${atribuidoAMim}`);
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.http.put(`${HELP_DESK_API}/api/tickets/${ticket.id}/${status}`, ticket);
  }

  sumario() {
    return this.http.get(`${HELP_DESK_API}/api/tickets/sumario`);
  }
}
