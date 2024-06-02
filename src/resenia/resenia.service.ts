import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose'
import { Resenia } from '../schemas/resenia.schema'
import { Model } from 'mongoose'
import { CreateReseniaDto } from '../dto/create-resenia'

import mongoose from 'mongoose'; // Importa mongoose
import { UsersService } from '../users/users.service';
@Injectable()
export class ReseniaService {
    constructor(@InjectModel(Resenia.name) private reseniaModel: Model<Resenia>, private readonly usersService: UsersService,){}

   async  findAll(){
      const reseñas = await this.reseniaModel.find().exec();
      const reseñasConDetalles = await Promise.all(
        reseñas.map(async (resenia) => {
          if (resenia.iduser) {
            if (mongoose.Types.ObjectId.isValid(resenia.iduser)) {
               const userDetails = await this.usersService.findOne(resenia.iduser);
               return { ...resenia.toObject(), userDetails };
            }
            return resenia.toObject();
          } else {
            return resenia.toObject();
          }
        }),
      );
      return reseñasConDetalles;
     
    }

    async create(createResenia:CreateReseniaDto){
        const newUser = new this.reseniaModel(createResenia)
         return newUser.save(); 
     }
 
     async findOne(id: string){
        return this.reseniaModel.findById(id)
     }
 
     async delete(id: string){
        return this.reseniaModel.findByIdAndDelete(id)
     }
 
     async update(id: string, resenia:CreateReseniaDto){
         return this.reseniaModel.findByIdAndUpdate(id,resenia, {new:true})
     }

     async findByUser(id: string){
      const resenias = await this.reseniaModel.find({ "iduser": id });
      return resenias;
   }

   async findByMovie(id: string){
      const resenias = await this.reseniaModel.find({ idmovie: id }).exec();
  const reseniasConDetalles = await Promise.all(
    resenias.map(async (resenia) => {
      if (resenia.iduser) {
        if (mongoose.Types.ObjectId.isValid(resenia.iduser)) {
          const userDetails = await this.usersService.findOne(resenia.iduser);
          return { ...resenia.toObject(), userDetails };
        }
        return resenia.toObject();
      } else {
        return resenia.toObject();
      }
    }),
  );
  return reseniasConDetalles;
      // const resenias = await this.reseniaModel.find({ "idmovie": id });
      // return resenias;
   }


}
