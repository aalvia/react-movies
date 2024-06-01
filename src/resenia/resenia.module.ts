import { Module } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaController } from './resenia.controller';
import { MongooseModule} from '@nestjs/mongoose'
import { Resenia, ReseniaSchema } from '../schemas/resenia.schema'
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Resenia.name,
      schema: ReseniaSchema,
    }
  ])],
  providers: [ReseniaService],
  controllers: [ReseniaController]
})
export class ReseniasModule {}
