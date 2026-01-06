import  express, {Router}  from "express";
import { commentController } from "./comment.controller";
 import auth, { UserRole } from "../../middalewared/auth";


const router = express.Router()

router.get(
   "/:commentId",
   commentController.getCommentById
)

router.delete(
   '/:commentId',
   auth(UserRole.ADMIN,UserRole.USER),
   commentController.deletComment
)

router.get(
   "/authorId/:authorId",
   commentController.getCommentAuthor
)


 router.post(
    "/",
    auth(UserRole.USER,UserRole.ADMIN), 
    commentController.createComment
 )


export const postRouter:Router = router;

export const commentRouter:Router=router