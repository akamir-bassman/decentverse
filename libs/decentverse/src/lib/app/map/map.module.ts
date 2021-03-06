import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as Map from "./map.model";
import { MapService } from "./map.service";
import { MapResolver } from "./map.resolver";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Map.Map.name, schema: Map.schema }]),
  ],
  providers: [MapService, MapResolver],
})
export class MapModule {}
