import { router } from 'src/trpc';
import { baseProcedure } from 'src/trpc/procedure';
import { handleServiceCall } from 'src/utils/service';

import { createEventZod } from './dto/create-event.dto';
import { readEventZod } from './dto/read-event.dto';
import { updateEventZod } from './dto/update-event.dto';
import { eventsService } from './events.service';

export const eventsRouter = router({
  create: baseProcedure
    .meta({ authRequired: true })
    .input(createEventZod)
    .mutation(async (opts) => {
      return handleServiceCall(
        eventsService.createEvent(opts.ctx.user!.id, opts.input),
      );
    }),
  read: baseProcedure.input(readEventZod).query(async (opts) => {
    return handleServiceCall(eventsService.readEvent(opts.input));
  }),
  update: baseProcedure
    .meta({ authRequired: true })
    .input(updateEventZod)
    .mutation(async (opts) => {
      return handleServiceCall(eventsService.updateEvent(opts.input));
    }),
});
