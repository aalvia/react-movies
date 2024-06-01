import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose'
import { Resenia } from '../schemas/resenia.schema'
import { Model } from 'mongoose'
import { CreateReseniaDto } from '../dto/create-resenia'

@Injectable()
export class ReseniaService {
    constructor(@InjectModel(Resenia.name) private reseniaModel: Model<Resenia>){}

    findAll(){
       return this.reseniaModel.find()
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

}
