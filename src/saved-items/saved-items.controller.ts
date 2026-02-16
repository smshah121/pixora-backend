import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { SavedItemService } from "./saved-items.service";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";

@Controller("saved-items")
@UseGuards(JwtAuthGuard)
export class SavedItemController {
  constructor(
    private readonly savedItemService: SavedItemService
  ){}

  @Post()
  create(@Body() createSavedItem: CreateSavedItemDto, @Req() req){
    return this.savedItemService.create(createSavedItem, req.user)
  }

  @Get('collections/:collectionId')
  findByCollection(
    @Param('collectionId', ParseIntPipe) collectionId: number,
    @Req() req
  ) {
    return this.savedItemService.findByCollection(collectionId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.savedItemService.remove(id, req.user);
  }
}