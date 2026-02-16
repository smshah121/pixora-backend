import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";

@Controller("collections")
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(
    private readonly collectionService : CollectionService
  ){}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto, @Req() req){
    return this.collectionService.create(createCollectionDto, req.user)
  }

  @Get()
  findAll(@Req() req){
    return this.collectionService.findAllByUser(req.user)

  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @Req() req){
    return this.collectionService.findOne(id, req.user)
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Req() req){
    return this.collectionService.remove(id, req.user)
  }
}  