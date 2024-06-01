import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
@Schema({
    timestamps:true
})
export class Movie {
    @Prop()
    titulo: string;
    @Prop()
    descripcion: string;
    @Prop()
    tipo: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);