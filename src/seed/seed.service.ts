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
    
      const { data: { results } } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
      results.forEach(async ({ name, url }) => {

        const segments = url.split('/')
        const no: number = +segments[ segments.length -2 ]

        const pokemon = await this.pokemonModel.create({ name, no });
        // try {
        //   // const pokemon = await this.pokemonModel.create( createPokemonDto );
        //   // return pokemon;
        //   const pokemon: CreatePokemonDto = {
        //     name: name,
        //     no: no
        //   }
        //   const createdPokemon = new this.pokemonModel(pokemon)
        //   return createdPokemon.save();

        // } catch (error) {
        //   throw new BadRequestException( error ); 
        // }
      });

      return'Seed executeds';
    }
  // create(createSeedDto: CreateSeedDto) {
  //   return 'This action adds a new seed';
  // }

  // findAll() {
  //   return `This action returns all seed`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} seed`;
  // }

  // update(id: number, updateSeedDto: UpdateSeedDto) {
  //   return `This action updates a #${id} seed`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} seed`;
  // }
}
