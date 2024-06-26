import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
@Schema({
    timestamps:true
})
export class User {
    @Prop({unique:true})
    username: string;
    @Prop({unique:true})
    email: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);