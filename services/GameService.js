import GameRepository from "../repositories/GameRepository.js";
import { NotFoundError } from "../errors/errors.js";

class GameService {
    static async getNextQuestion(id){    
        const game = await GameRepository.getById(id);   
        if(game.isOver)
            throw Error("Não tem mais perguntas não respondidas!")             
        
        const randomIndex = (Math.random() * game.getAvailableQuestions().length) | 0;

        const notResponded = game.getNotRespondedQuestion();
        if(notResponded.length > 0)
            throw Error("Usuário tem questões não respondidas")
        
        const question = game.getNextAvailableQuestion(randomIndex);

        await GameRepository.update(game);
        
        return question;
    }

    static async answerQuestion(gameId, questionId, answerId){
        const game = await GameRepository.getById(gameId);

        game.answerQuestion(questionId, answerId);
        const rightAnswer = question.answers.filter(x => x._id == answerId || x.isCorrect == true);
    }
}

export default GameService;