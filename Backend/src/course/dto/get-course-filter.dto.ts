import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class GetCourseFilter {
  @Field({ nullable: true })
  @IsOptional()
  search: string;
}
