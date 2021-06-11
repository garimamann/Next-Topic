import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:true
    }),
    CourseModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],

})
export class AppModule {}
