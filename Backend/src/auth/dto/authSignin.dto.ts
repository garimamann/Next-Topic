import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserType } from "src/auth/user.type";

@InputType()
export class authSigninDto{
@Field()
@IsNotEmpty()
@IsString()
email:string;

@Field()
@IsNotEmpty()
@IsString()
password:string;

}