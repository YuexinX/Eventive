import { eq } from 'drizzle-orm';
//import env from 'src/services/env';
import { nanoid } from 'nanoid';
import { ServiceError } from 'src/interfaces/error';
import {
  eventsTable,
  type NewDbEvent,
  type UpdateDbEvent,
} from 'src/schemas/events.schema';
import { usersTable } from 'src/schemas/users.schema';
import { database } from 'src/services/database';

import { type createEventDto } from './dto/create-event.dto';
import { type readEventDto } from './dto/read-event.dto';
import { type updateEventDto } from './dto/update-event.dto';

//const { WEB_URL } = env;

class EventsService {
  async createEvent(userId: number, opts: createEventDto) {
    const {
      title,
      date,
      time,
      timeZone,
      duration,
      location,
      description,
      dressCode,
      giftList,
    } = opts;

    return database.transaction(async (tx) => {
      const findUser = await tx.query.users.findFirst({
        where: eq(usersTable.id, userId),
      });

      if (!findUser) {
        throw new ServiceError(
          'User creating this event does not exist',
          'BAD_REQUEST',
        );
      }

      const inviteToken = nanoid(64);

      const newDbEvent: NewDbEvent = {
        eventTitle: title,
        ownerUserId: userId,
        eventDate: date,
        eventTime: time,
        eventTimeZone: timeZone,
        eventDuration: duration,
        eventLocation: location,
        eventDesc: description,
        dressCode,
        giftList,
      };

      const [createdEvent] = await tx
        .insert(eventsTable)
        .values(newDbEvent)
        .returning();

      return createdEvent;
    });
  }

  async readEvent(opts: readEventDto) {
    const id = opts.id;
    const foundEvent = await database.query.events.findFirst({
      where: eq(eventsTable.id, id),
    });

    if (!foundEvent) {
      throw new ServiceError('User does not exit', 'BAD_REQUEST');
    }
    return { event: foundEvent };
  }

  async updateEvent(opts: updateEventDto) {
    const {
      id,
      title,
      date,
      time,
      timeZone,
      duration,
      location,
      description,
      dressCode,
      giftList,
    } = opts;

    const { event: foundEvent } = await this.readEvent({ id });
    if (!foundEvent) {
      throw new ServiceError('Event not found', 'NOT_FOUND');
    }

    const updateDbEvent: UpdateDbEvent = {
      eventTitle: title,
      eventDate: date,
      eventTime: time,
      eventTimeZone: timeZone,
      eventDuration: duration,
      eventLocation: location,
      eventDesc: description,
      dressCode,
      giftList,
    };

    const [updateEvent] = await database
      .update(eventsTable)
      .set(updateDbEvent)
      .where(eq(eventsTable.id, id))
      .returning();

    return updateEvent;
  }
}

export const eventsService = new EventsService();
