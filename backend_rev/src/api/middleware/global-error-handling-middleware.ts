import { Request, Response, NextFunction} from "express";


export const globalErrorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Log the error for debugging
    if (err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }   
   

    
    res.status(500).json({ message: "Internal Server Error" });
};