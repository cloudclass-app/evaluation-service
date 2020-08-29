import { inject } from "@loopback/core";
import {
    get,
    getModelSchemaRef,
    param,
    post,
    Request,
    requestBody,
    RestBindings,
} from "@loopback/rest";
import { PrismaClient } from "@prisma/client";
import { DataBindings } from "../data/bindings";
import { CourseRead } from "../models/course";
import { CourseCreate } from "../models/course/course.create.model";

export class CourseController {
    constructor(
        @inject(RestBindings.Http.REQUEST) private req: Request,
        @inject(DataBindings.PRISMA) private prismaClient: PrismaClient
    ) {}

    @get("/courses")
    async getManyCourses(
        @param.query.number("skip") skip = 0,
        @param.query.number("take") take = 50
    ): Promise<CourseRead[]> {
        const courses = this.prismaClient.course.findMany({
            include: {
                evaluations: { select: { id: true } },
                members: { select: { id: true } },
            },
            skip,
            take,
        });

        return courses;
    }

    @post("/courses")
    async createCourse(
        @requestBody({
            content: {
                "application/json": {
                    schema: getModelSchemaRef(CourseCreate),
                },
            },
        })
        courseToCreate: CourseCreate
    ): Promise<CourseRead> {
        const course = await this.prismaClient.course.create({
            data: {
                organization: "test",
                ...courseToCreate,
            },
            include: {
                evaluations: { select: { id: true } },
                members: { select: { id: true } },
            },
        });

        return course;
    }
}
