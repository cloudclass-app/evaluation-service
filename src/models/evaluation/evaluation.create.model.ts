import { model, property } from "@loopback/repository";
import { EvaluationKind } from "@prisma/client";

@model()
export class EvaluationCreate {
    date: Date;
    title: string;
    description: string | undefined;
    kind: EvaluationKind;
}
