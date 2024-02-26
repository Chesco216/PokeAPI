import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  private readonly axios: AxiosInstance = axios;

    async executeSeed() {

      await this.pokemonModel.deleteMany({});

      const { data: { results } } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

      // const insertPromiseArray = [];
      const pokemoNToInsert: { name: string, no: number }[] = []

      results.forEach(async ({ name, url }) => {

        const segments = url.split('/')
        const no: number = +segments[ segments.length -2 ]
        //* FORMA 1
        //*? const pokemon = await this.pokemonModel.create({ name, no });
        
        //* FORMA 2 mas rapida
        //?   insertPromiseArray.push(
        //?     this.pokemonModel.create({ name, no })
        //?   )
        //? await Promise.all( insertPromiseArray );  // este await va afuerea de la funcion
        
        //* FORMA 3 MAS RECOMENDADA POR FH
        pokemoNToInsert.push({ name, no });

      });

      await this.pokemonModel.insertMany( pokemoNToInsert );


        
      return'Seed executeds';
    }

}
