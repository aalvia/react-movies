import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
@Schema({
    timestamps:true
})
export class Resenia {
    @Prop()
    detalle: string;
    @Prop()
    iduser: string;
    @Prop()
    estrellas: string;
}

export const ReseniaSchema = SchemaFactory.createForClass(Resenia);