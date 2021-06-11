import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength } from "class-validator";
import { UserType } from "src/auth/user.type";

@InputType()
export class createCourseInput{
@Field()
@IsNotEmpty()
@MaxLength(60)
title:string;

@Field()
@IsNotEmpty()
@MaxLength(200)
description:string;

@Field()
@IsNotEmpty()
link:string;

}