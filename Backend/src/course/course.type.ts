import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "src/auth/user.type";
import { CourseRating } from "./course-rating.enum";

@ObjectType('Course')
export class CourseType{
    @Field(type=>ID)
    id:string;

    @Field()
    title:string;

    @Field()
    description:string;
    @Field()
    teacherName:string;

    @Field()
    link:string;    

    @Field({ nullable: true })
    rating:number;   

    @Field(type=>UserType)
    teacher:string;

    @Field(type=>[UserType])
    students:string[];


}