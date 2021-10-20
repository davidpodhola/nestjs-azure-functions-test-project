import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

export const isPgsql = (process.env.NX_DB_DIALECT || 'postgres') === 'postgres';
export const isMssql = process.env.NX_DB_DIALECT === 'mssql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        return {
          installSubscriptionHandlers: true,
          autoSchemaFile: process.env.TMP + '\\test.graphql',
          debug: true,
          context: ({ req }) => ({ req }),
          sortSchema: true,
          useGlobalPrefix: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: 'SEQUELIZE',
      inject: [],
      useFactory: async () => {
        let sequelize;
        if (isPgsql) {
          sequelize = new Sequelize(
            process.env.DATABASE_URL ||
              'postgres://postgres:Coggel1234@localhost:5433/gt2',
          );
        } else if (isMssql) {
          sequelize = new Sequelize(
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
          );
        } else throw new Error('Database dialect not supported');
        // initModels(sequelize);
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
