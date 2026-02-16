import { Repository } from "typeorm";
import { Collections } from "./entities/collection.entity";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { User } from "src/user/entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { UserService } from "src/user/user.service";


@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collections)
    private readonly collectionRepo: Repository<Collections>,
    private readonly userService: UserService
  ){}


  async create(createCollectionDto: CreateCollectionDto, userPayload: any): Promise<Collections>{
    const user = await this.userService.findById(userPayload.id)
     if (!user) {
      throw new NotFoundException('User not found');
    }  
    const collections = this.collectionRepo.create({
      ...createCollectionDto,
      user
    })
    return await this.collectionRepo.save(collections)
  }


  async findAllByUser(userPayLoad:any):Promise<Collections[]>{
    const user = await this.userService.findById(userPayLoad.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.collectionRepo.find({
      where: {user: {id: user.id}},
      relations: ["savedItem", "user"],
    })
  }

  async findOne(id:number, userPayload:any): Promise<Collections>{
    const user = await this.userService.findById(userPayload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const collection = await this.collectionRepo.findOne({
      where: {id, user: {id: user.id}},
      relations: ["savedItem"],
    })

    if(!collection){
      throw new NotFoundException("collection not found")
    }
    return collection
  }


  async remove(id:number, userPayload:any): Promise<{message:string}>{
    const user = await this.userService.findById(userPayload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const collection = await this.collectionRepo.findOne({
      where: {id, user: {id: user.id}}
    })  
    if(!collection){
      throw new NotFoundException("collection not found")
    }
    await this.collectionRepo.remove(collection)
    return {message: "collection removed successfully!"}
  }
}