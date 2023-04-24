import 'dotenv/config';
export declare class RabbitMqService {
    private channel;
    private connection;
    init(): Promise<void>;
    sendMessage(userInfo: any): Promise<void>;
}
