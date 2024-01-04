import exp from "constants";
import { NextFunction, Request, Response } from "express";

const Test = {
    getName: (req: Request, res: Response, next: NextFunction) => {
        res.send("hallo")
    }
}

export { Test } 