import * as z from 'zod';


// THREAD VALIDATION CODE
export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 Characters'}),
    accountId: z.string(),

})


//COMMENT VALIDATION CODE

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 Characters'}),

})