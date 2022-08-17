import Question from "../models/Question.js";
import Game from "../models/Game.js";

class QuestionRepository{
    static async getById(id){
        Question.validateId(id)

        const question = await Question.findOne({_id: id})
        
        if(!question)
            throw new NotFoundError();
        
        return question;
    }

    static async create(title,answers){
        const newQuestion = new Question({title, answers})
        newQuestion.validateEntity();
        await newQuestion.save();
        return newQuestion;
    }

    static async update({id, title, answers}){
        Question.validateId(id);
        const question = await Question.findOne({_id: id});
        if(!question)
            throw new NotFoundError();

        question.title = title;
        question.answers = answers;

        question.validateEntity();
        question.save();
    }
} 

export default QuestionRepository;