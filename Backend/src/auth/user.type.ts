import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { Course } from "src/course/course.entity";
import { CourseType } from "src/course/course.type";
import { UserCourses } from "src/course/user-course.entity";

@ObjectType('User')
export class UserType{
    @Field(type=>ID)
    id:string;

    @Field()
    name:string;

    @Field()
    email:string;

    @Field()
    password:string;

    @Field()
    isTeacher:boolean;

    @Field(type=>[CourseType],{ nullable: true })
    createdCourses:Course[];

    @Field(type=>[CourseType],{ nullable: true })
    subscribedCourses:UserCourses[];



    // @Field()
    // teacher:user;

    // @Field()
    // students:[user];


}