import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { getRepository, Repository } from 'typeorm';
import { Course } from './course.entity';
import { createCourseInput } from './create-course.input';
import { GetCourseFilter } from './dto/get-course-filter.dto';
import { UserCourses } from './user-course.entity';

@Injectable()
export class CourseService {
  //injecting course repository
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  //all and searched courses
  async getAllCourses(search: string): Promise<Course[]> {
    const query = this.courseRepository.createQueryBuilder('course');

    if (search) {
      query.where(
        'course.title LIKE :search OR course.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const courses = await query
      .leftJoinAndSelect('course.teacher', 'teacher')
      .getMany();

    return courses;
  }

  //courses subscribed by user
  async getUserSubscribedCourses(user: User) {
    const query = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribedCourses', 'subscribedCourses')
      .where({ id: user.id })
      .getOne();
    let courseArray;
    courseArray = query.subscribedCourses.map(async (uc) => {
      return await uc.course;
    });
    console.log(query);
    return courseArray;
  }

  //get all created courses of user
  async getCreatedCourses(user: User) {
    const query = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.createdCourses', 'createdCourses')
      .where({ id: user.id })
      .getOne();

    return query.createdCourses;
  }

  async subscribeToCourse(user: User, courseId: string) {
    const userId = user.id;
    await UserCourses.create({ userId, courseId }).save();
    return true;
  }

  //user must have subscribed to course
  async addRating(user: User, courseId: string, rating: number) {
    const record = await UserCourses.findOne({
      where: { userId: user.id, courseId: courseId },
    });
    if (!record) {
      throw new NotAcceptableException(
        'User must be subscribed to the course!',
      );
    }
    record.rating = rating;
    await record.save();
    let courseRating = await Course.findOne({ id: courseId });
    courseRating.rating =
      courseRating.rating === 0
        ? rating
        : (courseRating.rating * courseRating.totalRatings + rating) /
          (courseRating.rating + 1);
    courseRating.totalRatings++;
    await courseRating.save();
    return 'rating added';
  }

  //get rating given by user
  async userRating(user: User, courseId: string) {
    const record = await UserCourses.findOne({
      where: { userId: user.id, courseId: courseId },
    });
    return record.rating;
  }

  //get total course rating
  async getCourseRating(courseId: string) {
    const record = await Course.findOne({ id: courseId });
    return record.rating;
  }

  // get number of students subscribed to course
  async getStudents(courseId: string) {
    const course = await Course.findOne({ id: courseId });
    let count = 0;
    course.students.map((c) => {
      count++;
    });
    return count;
  }

  async createCourse(
    createCourseInput: createCourseInput,
    user: User,
  ): Promise<Course> {
    const { title, description, link } = createCourseInput;
    const course = new Course();
    course.title = title;
    course.description = description;
    course.link = link;
    course.teacher = user;
    const teacher = await User.findOne({ where: { id: user.id } });
    teacher.createdCourses.push(course);
    try {
      await course.save();
    } catch (e) {
      console.log(e);
    }
    return course;
  }

  //Get single course
  async getCourse(courseId: string) {
    const course = this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.teacher', 'teacher')
      .where({ id: courseId })
      .getOne();
    return course;
  }
}
