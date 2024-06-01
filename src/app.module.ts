import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { ReseniasModule } from './resenia/resenia.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://andyalviaing:andy1234@cluster0.q7d5tff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: 'libelula', // Nombre de la base de datos
    }),
    MoviesModule,
    ReseniasModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
//mongodb://localhost/taskdb
export class AppModule {}
