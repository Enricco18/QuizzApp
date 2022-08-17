import { AppError } from "../../errors/errors.js";
import Question from "../../models/Question.js";
import QuestionRepository from "../../repositories/QuestionRepository.js";


const questionRoutes = async (fastify, opts) =>{
    
    fastify.get("/", async (req, res)=>{
        const allQuestions = await Question.find({})
        return allQuestions;
    })

    fastify.get("/:id", async (req, res)=>{
        const {id} = req.params;

        const question = await QuestionRepository.getById(id);
        return question;
    })

    fastify.post("/", async (req, res)=>{
        const {title,answers} = req.body;
        const newQuestion = await QuestionRepository.create(title,answers);
        return newQuestion;
    })

    fastify.put("/:id", async (req, res)=>{
        const query = {
            id: req.params.id,
            title: req.body.title,
            answers: req.body.answers
        }
        await QuestionRepository.update(query);
    })

    fastify.delete("/:id", async (req, res)=>{
        const {id} = req.params;
        await Question.deleteOne({_id: id});
        return {id};
    })

    fastify.setErrorHandler((error, request, reply)=>{
        fastify.log.error(error.message)
        if(!error.code){
            reply.internalServerError();
            return;
        }
        switch(error.code){
            case AppError.ERR_NOT_FOUND:
                fastify.log.error(error.message)
                reply.notFound(error.message);
                break;
            case AppError.ERR_VALIDATION_ERROR:
                fastify.log.error(error.message)
                reply.badRequest(error.message);
                break;
            default:
                res.internalServerError();
                break;
        }  

    })

}

export default questionRoutes;