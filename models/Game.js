import mongoose from "mongoose";
import { AnswerSchema, QuestionSchema } from "./Question.js";
import { NotFoundError, ValidationError } from "../errors/errors.js";
import gameRoutes from "../routes/game/index.js";
const { Schema } = mongoose;

const GameMethods = {
    methods:{
        getNotRespondedQuestion: function(){
            const notResponded = this.answerdQuestions.filter(x => x.hasRespond == false);
            return notResponded;
        },
        getAvailableQuestions: function(){
            return this.availableQuestions;
        },
        getNextAvailableQuestion: function(randomIndex){
            if(this.isOver)
                throw Error("Não tem mais perguntas não respondidas!")
            
            const question = this.availableQuestions[randomIndex];
            if(!question)
                throw NotFoundError();
            
            this.availableQuestions.splice(randomIndex, 1);
            this.answerdQuestions.push({                
                question : question,
                answers : null,
                hasRespond: false,
                isCorrect: null});
            if(this.availableQuestions.length <= 0){
                this.isOver = true;
            }
            return question;
        }
    },
    statics:{
        validateId: (id)=>{
            if(! mongoose.isValidObjectId(id))
                throw new ValidationError(null, "Id", "ObjectId não válido");
        }
    }
};

const GameStageMethods = {
    statics:{},
    methods:{
        getAnswerById: function(answerId){
            const answerIndex = this.answers.indexOf(x=> x._id == answerId);
            if(answerIndex<0){
                throw NotFoundError();
            }
            return this.answers[answerId]
        },
        answerQuestion: function(answer){
            this.hasRespond = true;
            this.markQuestion(stageObj,answer)
            this.answers = [...answer]
        },
    }
}

const GameStageSchema = new Schema(
    {
        question: QuestionSchema,
        answers: [AnswerSchema],
        hasRespond: Boolean,
        isCorrect: Boolean
    }
);

const GameSchema = new Schema({
    answerdQuestions: [GameStageSchema],
    availableQuestions: [QuestionSchema],
    total: Number,
    correct: Number,
    wrong: Number,
    isOver: Boolean
}, GameMethods);

export default mongoose.model("Game", GameSchema);