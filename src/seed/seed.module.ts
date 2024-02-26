import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
            MongooseModule.forFeature([
              {
                name: Pokemon.name,
                schema: PokemonSchema,
              }
            ]),
           ]
})
export class SeedModule {}
