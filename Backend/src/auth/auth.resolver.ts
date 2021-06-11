import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { authSigninDto } from './dto/authSignin.dto';
import { authSignupDto } from './dto/authSignup.dto';
import { Token } from './token.type';

import { User } from './user.entity';
import { UserType } from './user.type';
import { UserToken } from './userToken.type';



@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => UserType)
  signup(@Args('email') email:string,@Args('password') password:string,@Args('name') name:string,@Args('isTeacher') isTeacher:string,) {
    return this.authService.signup(name,email,password,isTeacher);
  }

  @Mutation((returns) => UserToken)
  signin(
    @Args('email') email:string,@Args('password') password:string,
  ): Promise< UserToken > {
    return this.authService.signin(email,password);
  }
}
