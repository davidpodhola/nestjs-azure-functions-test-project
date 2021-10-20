import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async now(): Promise<string> {
    return new Date().toString();
  }
}
