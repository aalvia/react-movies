import { Controller,Get,Post,Delete,Put,Body,Param,ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { async } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){ }
        @Get()
        findAll(){
            return this.usersService.findAll();
        }

        @Get(':id')
        async findOne(@Param('id') id: string){
          
            const user = await this.usersService.findOne(id);
            if (!user){
                throw new NotFoundException("user no encontrada");
            }
            return user;
        }

        @Post()
        async create(@Body() body: CreateUserDto){
            try{
            console.log(body)
           
            return await this.usersService.create(body);
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
           const user = await this.usersService.delete(id);
           if (!user){
            throw new NotFoundException("user no encontrado")
           }
           return user
        }

        @Put(':id')
        async update(@Param('id') id: string,@Body() body: CreateUserDto){
            const user = await this.usersService.update(id,body);
            if( !user){
                throw new  NotFoundException("usuario no encontrado")
            }
            return user
        }

        @Post('login')
    async login(@Body() body: { username: string; password: string }) {
       
        const { username, password } = body;
        
        return this.usersService.login(username, password);
    }
}
