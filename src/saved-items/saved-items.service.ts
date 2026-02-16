import { Repository } from "typeorm";
import { SavedItem } from "./entities/saved-item.entity";
import { Collections } from "src/collection/entities/collection.entity";
import { CreateCollectionDto } from "src/collection/dto/create-collection.dto";
import { User } from "src/user/entities/user.entity";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { use } from "passport";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class SavedItemService {
  constructor(
    @InjectRepository(Collections)
    private readonly collectionRepo: Repository<Collections>,
    @InjectRepository(SavedItem)
    private readonly savedItemRepo: Repository<SavedItem>,

    private readonly userService: UserService
    
  ){}

 async create(createSavedItemDto: CreateSavedItemDto, userPayload: any): Promise<SavedItem> {
  // Fetch the full user entity first
  const user = await this.userService.findById(userPayload.id);
  
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const collection = await this.collectionRepo.findOne({
    where: {
      id: createSavedItemDto.collectionId,
      user: { id: user.id }
    }
  });

  if (!collection) {
    throw new ForbiddenException("collection not found or access denied");
  }

  const existingItem = await this.savedItemRepo.findOne({
    where: {
      externalId: createSavedItemDto.externalId,
      user: { id: user.id },
      collection: { id: collection.id }
    }
  });

  if (existingItem) {
    return existingItem;
  }

  const savedItem = this.savedItemRepo.create({
    title: createSavedItemDto.title,
    type: createSavedItemDto.type,
    src: createSavedItemDto.src,
    thumbnail: createSavedItemDto.thumbnail,
    url: createSavedItemDto.url,
    externalId: createSavedItemDto.externalId,
    user,  // Now this is the full User entity
    collection  // You should also pass the collection here
  });

  return await this.savedItemRepo.save(savedItem);
}

  async findByCollection(collectionId:number, userPayload: any):Promise<SavedItem[]>{
    const user = await this.userService.findById(userPayload.id);
  
  if (!user) {
    throw new NotFoundException('User not found');
  }
    const collections = await this.collectionRepo.findOne({
      where: {
        id: collectionId,
        user: {id:user.id}
      }
    })

    if(!collections){
      throw new ForbiddenException("access denied")
    }

    return await this.savedItemRepo.find({
      where: {collection: {id:collectionId}},
      relations: ["collection", "user"], 
      order: {createdAt: "DESC"}
    })

  }

  async remove(id: number, userPayload: any): Promise<{message: string}> {
  // Fetch the full user first
  const user = await this.userService.findById(userPayload.id);
  
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const savedItem = await this.savedItemRepo.findOne({
    where: { id },
    relations: ["user"],
  })
  
  if (!savedItem) {
    throw new NotFoundException("saved item not found")
  }
  
  if (savedItem.user.id !== user.id) {
    throw new ForbiddenException("access denied")
  }
  
  await this.savedItemRepo.remove(savedItem)
  return { message: "saved item removed successfully" }
}
}