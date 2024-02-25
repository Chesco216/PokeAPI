import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { readSync } from 'fs';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

    async executeSeed() {
    
      const { data: { results } } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=2');
      results.forEach(({ name, url }) => {
        const segments = url.split('/')
        const no: number = +segments[ segments.length -2 ]
        console.log(segments)
        console.log({ name, no })
      });

      return results;
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
