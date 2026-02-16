import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findOne(id);
    if(!user) throw new NotFoundException("user not found")
      return user;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.userService.update(id, updateUserDto);
    if(!updateUser) throw new NotFoundException("user not found");
    return {
  success: true,
  message: "User updated successfully!"
};
  }
  

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{deletedId: number}> {
    const deleted = await this.userService.remove(id);
    if(!deleted) throw new NotFoundException("user not found")
      return {deletedId:id}
  }
}
