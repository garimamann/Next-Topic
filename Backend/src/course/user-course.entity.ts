import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class UserCourses extends BaseEntity{
   @PrimaryColumn()
   userId:string;

   @PrimaryColumn()
   courseId:string;

   @Column({nullable:true})
   rating:number;

   @ManyToOne(()=>User,user=>user.subscribedCourses,{primary:true})
   @JoinColumn({name:"userId"})
   user:Promise<User>;

   @ManyToOne(()=>Course,course=>course.students,{primary:true})
   @JoinColumn({name:"courseId"})
   course:Promise<Course>;

}