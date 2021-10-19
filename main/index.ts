import { Context, HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';
import { createApp, loggerWrapper } from '../src/main.azure';
import { Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const intercept = require('azure-function-log-intercept');

export default function (context: Context, req: HttpRequest): void {
  intercept(context); // console.log works now!
  context.log('main/index started');
  (loggerWrapper as any).logger = context.log;
  try {
    /* const sequelize = new Sequelize(
      process.env.NX_MSSQL_DATABASE,
      process.env.NX_MSSQL_USER,
      process.env.NX_MSSQL_PASSWORD,
      {
        dialect: 'mssql',
        host: process.env.NX_MSSQL_HOST,
        dialectOptions: {
          // Observe the need for this nested `options` field for MSSQL
          options: {
            // Your tedious options here
            useUTC: false,
            dateFirst: 1,
          },
        },
      },
    ); */

    AzureHttpAdapter.handle(createApp, context, req);
  } catch (e) {
    context.log.error(e);
  }
}
