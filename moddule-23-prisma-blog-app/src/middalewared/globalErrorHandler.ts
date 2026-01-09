import { NextFunction, Request, Response } from "express"
import { Prisma } from "../../generated/prisma/client";

function errorHandler (err:any,
    req:Request,
     res:Response,
      next:NextFunction
    ) {
      let statusCode = 500;
      let errorMessage = "Internal server Error";
      let errorDtails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode=400;
    errorMessage="you provide incorrect field type or missing fields"
  }
  //prismaCliendKnownRequiestError
  if(err instanceof Prisma.PrismaClientKnownRequestError){
    if(err.code ==="P2025"){
      statusCode=400;

      errorMessage="An operation failed because it depends on one or more records that were required but not found."
    }
    else  if(err.code ==="P1016"){
      statusCode=400;

      errorMessage="Your raw query had an incorrect number of parameters. Expected"
    }
      if(err.code ==="P2003"){
      statusCode=400;

      errorMessage="Foreign key constraint failed on the field"
    }
  }


  //PrismaClientUnknownRequestError 
    else if(err instanceof Prisma.PrismaClientUnknownRequestError){
      statusCode=400;
      errorMessage="error accured during query execution"
  }
   //PrismaClientRustPanicError  
    else if(err instanceof Prisma.PrismaClientRustPanicError ){
 statusCode = 500;
  errorMessage = "Internal database engine error"
  }
  res.status(statusCode)
  res.json({
    message:errorMessage,
    error:errorDtails
  })
}


export default errorHandler