import cache from "memory-cache";
import { Request, Response, NextFunction } from "express";

// 캐싱 미들웨어
export const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("Cache-Control", `public, max-age=${duration}`);
      res.setHeader("X-Cache-Duration", `${duration} seconds`);
      res.send(cachedBody);
      return;
    } else {
      const originalSend = res.send.bind(res);
      res.send = (body: any) => {
        cache.put(key, body, duration * 1000);
        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", `public, max-age=${duration}`);
        res.setHeader("X-Cache-Duration", `${duration} seconds`);
        originalSend(body);
      };
      next();
    }
  };
};
