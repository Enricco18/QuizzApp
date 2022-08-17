import mongoose from "mongoose";
import { AnswerSchema, QuestionSchema } from "./Question.js";
import { ValidationError } from "../errors/errors.js";
const { Schema } = mongoose;

const GameMethods = {
    methods:{
    },
    static:{
        validateId: (id)=>{
            if(! mongoose.isValidObjectId(id))
                throw new ValidationError(null, "Id", "ObjectId não válido");
        }
    }
};

const GameSchema = new Schema({
    answerdQuestions: [
        {
            question: QuestionSchema,
            answer: [AnswerSchema],
            hasRespond: Boolean,
            isCorrect: Boolean
        }
    ],
    availableQuestions: [QuestionSchema],
    total: Number,
    correct: Number,
    wrong: Number,
    isOver: Boolean
}, GameMethods);

export default mongoose.model("Game", GameSchema);