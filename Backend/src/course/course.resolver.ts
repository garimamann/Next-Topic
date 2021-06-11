import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UserType } from 'src/auth/user.type';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseType } from './course.type';
import { createCourseInput } from './create-course.input';
import { GetCourseFilter } from './dto/get-course-filter.dto';

@Resolver((of) => CourseType)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Query((returns) => [CourseType])
  getCourses(@Args('search') serach?: string): Promise<Course[]> {
    return this.courseService.getAllCourses(serach);
  }

  @Query((returns) => [CourseType])
  @UseGuards(GqlAuthGuard)
  getSubscribedCourses(@CurrentUser() user: User) {
    return this.courseService.getUserSubscribedCourses(user);
  }

  @Query((returns) => [CourseType])
  @UseGuards(GqlAuthGuard)
  getCreatedCourse(@CurrentUser() user: User) {
    return this.courseService.getCreatedCourses(user);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(GqlAuthGuard)
  subscribeToCourse(
    @CurrentUser() user: User,
    @Args('courseId') courseId: string,
  ) {
    return this.courseService.subscribeToCourse(user, courseId);
  }

  @Mutation((returns) => CourseType)
  @UseGuards(GqlAuthGuard)
  createCourse(
    @CurrentUser() user: User,
    @Args('createCourseInput') createCourseInput: createCourseInput,
  ) {
    return this.courseService.createCourse(createCourseInput, user);
  }

  @Mutation((returns) => String)
  @UseGuards(GqlAuthGuard)
  addRating(
    @CurrentUser() user: User,
    @Args('courseId') courseId: string,
    @Args('rating') rating: string,
  ) {
    console.log(rating);
    return this.courseService.addRating(user, courseId, parseInt(rating));
  }

  @Mutation((returns) => Number)
  @UseGuards(GqlAuthGuard)
  userRating(@CurrentUser() user: User, @Args('courseId') courseId?: string) {
    return this.courseService.userRating(user, courseId);
  }

  @Query((returns) => String)
  @UseGuards(GqlAuthGuard)
  getCourseRating(@Args('courseId') courseId: string) {
    return this.courseService.getCourseRating(courseId);
  }

  @Query((returns) => Number)
  @UseGuards(GqlAuthGuard)
  getStudentsOfCourse(@Args('courseId') courseId: string) {
    return this.courseService.getStudents(courseId);
  }

  @Query((returns) => CourseType)
  getSingleCourse(@Args('courseId') courseId: string) {
    return this.courseService.getCourse(courseId);
  }
}
