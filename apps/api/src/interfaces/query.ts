import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { Schemas } from 'src/schemas';

export interface QueryOptions {
  transaction?:
    | PgTransaction<
        NodePgQueryResultHKT,
        Schemas,
        ExtractTablesWithRelations<Schemas>
      >
    | undefined;
  hardDelete?: boolean;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
}

export interface SortingOptions {
  id: string;
  desc: boolean;
}
[];
