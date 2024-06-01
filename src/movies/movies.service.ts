import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Movie } from '../schemas/movie.schema'
import { Model } from 'mongoose'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { UpdateMovieDto } from '../dto/update-movie.dto'
@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>){}

    findAll(){
        this.movieModel.find()
    }

    async create(createMovie:CreateMovieDto){
       const newMovie = new this.movieModel(createMovie)
        return newMovie.save(); 
    }

    async findOne(id: string){
        this.movieModel.findById(id)
    }

    async delete(id: string){
        this.movieModel.findByIdAndDelete(id)
    }

    async update(id: string, movie:UpdateMovieDto){
        return this.movieModel.findByIdAndUpdate(id,movie)
    }

}
