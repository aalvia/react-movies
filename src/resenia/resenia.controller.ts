import { Controller,Get,Post,Delete,Put,Body,Param,ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { CreateReseniaDto } from 'src/dto/create-resenia';
import { async } from 'rxjs';

@Controller('resenias')
export class ReseniaController {
    constructor(private reseniaService: ReseniaService){ }
        @Get()
        findAll(){
            return this.reseniaService.findAll();
        }

        @Get(':id')
        async findOne(@Param('id') id: string){
          
            const user = await this.reseniaService.findOne(id);
            if (!user){
                throw new NotFoundException("user no encontrada");
            }
            return user;
        }

        @Post()
        async create(@Body() body: CreateReseniaDto){
            try{
            console.log(body)
           
            return await this.reseniaService.create(body);
        }catch(error){
            if(error.code == 11000){
                throw new ConflictException('Ya existe el usuario')
            }
            throw error;
        }
        }

        @Delete(':id')
        @HttpCode(204)
        async delete(@Param('id') id: string){
           const user = await this.reseniaService.delete(id);
           if (!user){
            throw new NotFoundException("user no encontrado")
           }
           return user
        }

        @Put(':id')
        async update(@Param('id') id: string,@Body() body: CreateReseniaDto){
            const user = await this.reseniaService.update(id,body);
            if( !user){
                throw new  NotFoundException("usuario no encontrado")
            }
            return user
        }

        @Get('byuser/:id')
        async findByUser(@Param('id') id: string) {
          return this.reseniaService.findByUser(id);
        }

        @Get('bymovie/:id')
        async findByMovie(@Param('id') id: string) {
          return this.reseniaService.findByMovie(id);
        }
}
