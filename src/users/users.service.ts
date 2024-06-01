import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    findAll(){
       return this.userModel.find()
    }

    async create(createMovie:CreateUserDto){
        const newUser = new this.userModel(createMovie)
         return newUser.save(); 
     }
 
     async findOne(id: string){
        return this.userModel.findById(id)
     }
 
     async delete(id: string){
        return this.userModel.findByIdAndDelete(id)
     }
 
     async update(id: string, movie:CreateUserDto){
         return this.userModel.findByIdAndUpdate(id,movie, {new:true})
     }

     async login(username: string, password: string): Promise<User> {
      console.log(username)
      const user = await this.userModel.findOne({ "username": username });
      console.log(user);
      console.log(password);
      
      if (!user || user.password !== password) {
          throw new Error('Credenciales inválidas');
      }
      return user;
  }
}
