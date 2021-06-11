import { Float } from '@nestjs/graphql';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { CourseRating } from './course-rating.enum';
import { UserCourses } from './user-course.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({ type: 'real', default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalRatings: number;

  @ManyToOne((type) => User, (user) => user.createdCourses, { eager: false })
  teacher: User;

  @OneToMany(() => UserCourses, (course) => course.course, { eager: true })
  students: UserCourses[];
}
