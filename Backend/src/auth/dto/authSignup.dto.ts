import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserType } from "src/auth/user.type";

@InputType()
export class authSignupDto{
@Field()
@IsString()
@IsNotEmpty()
@MaxLength(60)
name:string;

@Field()
@IsNotEmpty()
@IsString()
email:string;

@Field()
@IsNotEmpty()
@IsString()
password:string;

@Field()
@IsNotEmpty()
isTeacher:boolean;
}