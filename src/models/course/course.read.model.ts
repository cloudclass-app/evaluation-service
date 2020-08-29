export class CourseRead {
    id: string;
    name: string;
    evaluations: Partial<{ id: string }>[];
    members: Partial<{ id: string }>[];
}
