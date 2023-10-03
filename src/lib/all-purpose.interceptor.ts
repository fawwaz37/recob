import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AllPurposeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.statusCode) {
          return data;
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode || 200, // Default ke 200 jika tidak ada status code
          data: { ...data },
        };
      }),
    );
  }
}
