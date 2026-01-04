import  express, {Router}  from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middalewared/auth";

const router = express.Router();

// type for role 

router.get(
    "/",
    PostController.getAllPost
)
router.get(
     "/:postId",
     PostController.getPostById
)

router.post(
    '/',
    auth(UserRole.USER),
    PostController.createPost
)


export const postRouter:Router = router;