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
    "/get-mypost",
    auth(UserRole.ADMIN,UserRole.USER),
    PostController.getMyPost,
)
router.get(
     "/:postId",
     PostController.getPostById
)

router.post(
    '/',
    auth(UserRole.USER,UserRole.ADMIN),
    PostController.createPost
)

router.patch(
    "/:postId",
    auth(UserRole.ADMIN, UserRole.USER),
    PostController.updatePost
)


export const postRouter:Router = router;