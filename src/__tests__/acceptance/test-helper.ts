import {
    Client,
    createRestAppClient,
    givenHttpServerConfig,
} from "@loopback/testlab";
import { EvaluationServiceApplication } from "../..";

export const setupApplication = async (): Promise<AppWithClient> => {
    const restConfig = givenHttpServerConfig({
        // Customize the server configuration here.
        // Empty values (undefined, '') will be ignored by the helper.
        //
        // host: process.env.HOST,
        // port: +process.env.PORT,
    });

    const app = new EvaluationServiceApplication({
        rest: restConfig,
    });

    await app.boot();
    await app.start();

    const client = createRestAppClient(app);

    return { app, client };
};

export interface AppWithClient {
    app: EvaluationServiceApplication;
    client: Client;
}
