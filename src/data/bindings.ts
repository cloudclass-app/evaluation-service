import { BindingKey } from "@loopback/core";
import { PrismaClient } from "@prisma/client";

export namespace DataBindings {
    export const PRISMA = BindingKey.create<PrismaClient>("data.prisma");
}
