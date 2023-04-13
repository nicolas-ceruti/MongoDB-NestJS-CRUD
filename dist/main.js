"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const rabbit_mq_service_1 = require("./rabbit-mq/rabbit-mq.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const rabbitMqService = app.get(rabbit_mq_service_1.RabbitMqService);
        await rabbitMqService.init();
    }
    catch (ex) {
        console.log("Unable to connect to rabbitMQ");
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map