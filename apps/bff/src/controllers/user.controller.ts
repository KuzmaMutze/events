import { EventsClient } from '@integrations/events';
import { Controller, Get, Inject } from '@nestjs/common';
import { EVENTS_CLIENT } from '../constants';
import { Token } from '../decorators/token.decorator';

@Controller('/api/users')
export class UserController {
  constructor(
    @Inject(EVENTS_CLIENT) private readonly eventsClient: EventsClient
  ) {}

  @Get()
  getUsers(@Token() token: string) {
    return this.eventsClient.getUsers(token);
  }
}
