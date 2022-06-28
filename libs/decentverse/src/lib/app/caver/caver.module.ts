import { DynamicModule, Global, Module } from "@nestjs/common";
import { CaverService } from "./caver.service";
import { CaverConsumer } from "./caver.consumer";
import { BullModule } from "@nestjs/bull";
import { KlaytnOptions } from "../kas/kas.service";
import { RedisOptions } from "../rt/rt.service";
@Global()
@Module({})
export class CaverModule {
  static register(redisOptions?: RedisOptions, options?: KlaytnOptions): DynamicModule {
    return {
      module: CaverModule,
      imports: [
        BullModule.registerQueue({
          name: "caver",
          redis: {
            host: redisOptions.url?.split(":")[0].replace("redis://", "") ?? "localhost",
            port: parseInt(redisOptions.url?.split(":")[1] ?? "6379"),
          },
        }),
      ],
      providers: [
        {
          provide: "KLAYTN_OPTIONS",
          useValue: options,
        },
        CaverService,
      ],
      exports: [CaverService],
    };
  }
}