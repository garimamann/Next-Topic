import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/course.type';

import { UserType } from './user.type';

@ObjectType("Token")
export class UserToken {
  @Field()
  isTeacher: boolean;

  @Field()
  token: string;


}
