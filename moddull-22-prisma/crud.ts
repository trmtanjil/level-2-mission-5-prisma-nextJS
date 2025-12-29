import { userInfo } from "node:os";
import { prisma } from "./lib/prisma";


async function run() {
    // const createUser = await prisma.user.create({
    //     data:{
    //         name:'tanvir',
    //         email:'tanvir@gmail.com'
    //     }
    // })
    // console.log('cratre user; ',createUser)


    //post crate 
    // const createPost = await prisma.post.create({
    //     data:{
    //         title:'this is big title',
    //         content:'the content is very big',
    //         authorId:1
    //     }
    // })
    // console.log('created post ',createPost)

    // profile create 
    // const createProfil = await prisma.profil.create({
    //     data:{
    //         bio:'from narsingdi',
    //         userId:1
    //     }
    // })
    // console.log(createProfil)

    // retrive all user
    // const users= await prisma.user.findMany({
    //     // include:{
    //     //     posts:true,
    //     //     profils:true
    //     // }

    //            select:{
    //             id:true,
    //             name:true,
    //             email:true,
    //         posts:true,
    //         profils:true
    //     }
    // });
    // console.dir(users,{depth:Infinity})



// const updateUser = await prisma.profil.update({
//     where:{
//         userId:1
//     },
//     data:{
//         bio:'im student at ph level 2',
//         dateofBirth:'2025-12-29T04:59:47.373Z'
//     },
//     select:{
//         id:true,
//         bio:true,
//         user:{
//             select:{
//                 name:true,
//                 email:true
//             }
//         },
//     }
// })

// console.log('update user',updateUser)



// const deletedUser = await prisma.user.delete({
//     where:{
//         id:2
//     }
// })
// console.log(deletedUser)



//get user data by id
const getuserDatabyId = await prisma.user.findUnique({
    where:{
        id:2,
    },
    include:{
        posts:true,
        profils:true
    }
})
console.log(getuserDatabyId)









}

run()