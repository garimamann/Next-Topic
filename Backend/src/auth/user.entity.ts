import { UserType } from 'src/auth/user.type';
import { Course } from 'src/course/course.entity';
import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserCourses } from 'src/course/user-course.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  isTeacher: boolean;

  @OneToMany((type) => Course, (Course) => Course.teacher)
  createdCourses: Course[];

  @OneToMany(() => UserCourses, (course) => course.user)
  subscribedCourses: UserCourses[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
