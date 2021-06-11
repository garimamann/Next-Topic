import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from './course.entity';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { UserCourses } from './user-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, UserCourses]), AuthModule],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
