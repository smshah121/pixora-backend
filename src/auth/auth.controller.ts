import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guards/local-guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-guard';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService:UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req){
    return this.authService.login(req.user)
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates Google OAuth2 login
  }

  // Google callback
  @Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req, @Res() res: Response) {
  const tokenData = await this.authService.googleLogin(req.user);
  res.redirect(`http://localhost:5173/oauth-success?token=${tokenData.access_token}`);
}


  
  @Post("register")
  async register(@Body() createUserDto:CreateUserDto){
    return this.authService.register(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() req){
    return this.authService.getProfile(req.user.sub)
  }


}
