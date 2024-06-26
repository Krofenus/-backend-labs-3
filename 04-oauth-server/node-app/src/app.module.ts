import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard} from 'nest-keycloak-connect';
import {UserController} from './users/user.controller';
import {UserService} from './users/user.service';
import {APP_GUARD} from "@nestjs/core";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'pg',
            port: 5432,
            username: 'pguser',
            password: 'password',
            database: 'keycloak',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        KeycloakConnectModule.register({
            authServerUrl: 'http://keycloak:8080/',
            realm: 'ilya',
            clientId: 'nest-app',
            secret: 'wDrQ3F9qRQTcs09vN0Z9eAnNtO1s6rQM',
        }),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
}