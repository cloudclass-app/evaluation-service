import { model, property } from "@loopback/repository";
import { EvaluationKind } from "@prisma/client";

@model()
export class EvaluationRead {
    @property()
    id: string;

    @property()
    title: string;

    @property()
    description?: string;

    @property()
    kind?: EvaluationKind;
}
