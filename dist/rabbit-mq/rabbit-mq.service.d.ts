import 'dotenv/config';
export declare class RabbitMqService {
    private connection;
    private channel;
    init(): Promise<void>;
    sendMessage(userInfo: any): Promise<void>;
}
