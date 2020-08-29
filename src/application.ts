import { BootMixin } from "@loopback/boot";
import { ApplicationConfig } from "@loopback/core";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import {
    RestExplorerBindings,
    RestExplorerComponent,
} from "@loopback/rest-explorer";
import { ServiceMixin } from "@loopback/service-proxy";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { DataBindings } from "./data/bindings";
import { MySequence } from "./sequence";

export { ApplicationConfig };

export class EvaluationServiceApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication))
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static("/", path.join(__dirname, "../public"));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: "/explorer",
        });
        this.component(RestExplorerComponent);

        this.bind(DataBindings.PRISMA).to(new PrismaClient());

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ["controllers"],
                extensions: [".controller.js"],
                nested: true,
            },
        };
    }
}
