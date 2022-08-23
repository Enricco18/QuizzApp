import mongoose from "mongoose";
import { ValidationError } from "../errors/errors.js";
const { ObjectId, Schema } = mongoose;

const AnswerSchema = new Schema({
    title: String,
    isCorrect: Boolean
});

const QuestionAttributes =  {
    title: String,
    answers: [AnswerSchema] 
}

const QuestionMethods =  {
    statics:{
        validateId: (id)=>{
            if(! mongoose.isValidObjectId(id))
                throw new ValidationError(null, "Id", "ObjectId não válido");
        }
    },
    methods:{
        validateEntity: function(){
            console.log(this.answers)
        },
        getCorrectAnswer: function(){
            const rightAnswer = this.answers.filter(x => x.isCorrect == true);
            return rightAnswer;
        }
        
    }

}

const QuestionSchema = new Schema(QuestionAttributes, QuestionMethods)
export default mongoose.model("Question", QuestionSchema);

export {QuestionSchema, AnswerSchema};