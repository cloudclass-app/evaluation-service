import { inject } from "@loopback/core";
import {
    Request,
    RestBindings,
    get,
    getModelSchemaRef,
    param,
    post,
    requestBody,
} from "@loopback/rest";
import { PrismaClient } from "@prisma/client";
import { DataBindings } from "../data/bindings";
import { EvaluationCreate, EvaluationRead } from "../models/evaluation";

export class EvaluationController {
    constructor(
        @inject(RestBindings.Http.REQUEST) private req: Request,
        @inject(DataBindings.PRISMA) private prismaClient: PrismaClient
    ) {}

    @get("/{courseId}/evaluations")
    async getManyEvaluations(
        @param.path.string("courseId") courseId: number,
            @param.query.number("skip") skip = 0,
            @param.query.number("take") take = 50
    ): Promise<EvaluationRead[]> {
        const evaluations = await this.prismaClient.evaluation.findMany({
            skip,
            take,
        });

        console.log(courseId);

        console.log(evaluations);

        return [
            {
                id: "",
                title: "Title",
            },
        ];
    }

    @post("/evaluations")
    async createEvaluation(
        @requestBody({
            content: {
                "application/json": {
                    schema: getModelSchemaRef(EvaluationCreate),
                },
            },
        })
            evaluationToCreate: EvaluationCreate
    ): Promise<EvaluationRead> {
        /* const evaluation = await this.prismaClient.evaluation.create({
            data: {
                organization: "test",
                course: new Course
                ...evaluationToCreate
            },
        });

        console.log(evaluations);*/

        return {
            id: "",
            title: "Title",
        };
    }
}
