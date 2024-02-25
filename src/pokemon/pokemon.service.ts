import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {
      this.handleExeptions( error );  
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {

    let pokemon: Pokemon;

    if ( !isNaN(+id ) ) {
      pokemon = await this.pokemonModel.findOne({ no: id })
    } 
    if ( isValidObjectId( id )) {
      pokemon = await this.pokemonModel.findById( id );
    }
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase().trim() })
    }
    if ( !pokemon ) throw new NotFoundException( `pokemon not found `);

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
  
    const pokemon = await this.findOne( id );
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      await pokemon.updateOne( updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExeptions( error )  
    }

  }

  async remove(id: string ) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findOneAndDelete({id})
    // if( !result ) throw new BadRequestException( `pokemon not found` );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0 ) throw new BadRequestException( `pokemon with id ${ id } not found` );
    
  }


  private handleExeptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon exists in db ${ JSON.stringify( error.keyValue ) }` );
    }
  } 

}
