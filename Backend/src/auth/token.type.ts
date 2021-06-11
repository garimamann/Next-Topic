import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { CourseType } from "src/course/course.type";

@ObjectType()
export class Token{
    @Field(type=>String)
    token:string;
}