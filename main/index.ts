import { Context, HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';
import { createApp, loggerWrapper } from "../src/main.azure";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const intercept = require('azure-function-log-intercept');

export default function(context: Context, req: HttpRequest): void {
  intercept(context); // console.log works now!
  context.log('main/index started');
  (loggerWrapper as any).logger = context.log;
  AzureHttpAdapter.handle(createApp, context, req);
}
