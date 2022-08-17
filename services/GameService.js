import Game from "../models/Game.js";
import GameRepository from "../repositories/GameRepository.js";
import { NotFoundError } from "../errors/errors.js";

class GameService {
    static async getNextQuestion(id){
        
        const game = GameRepository.getById(id);
        
        const {availableQuestions, answerdQuestions} = game;

        if(game.isOver)
            throw Error("Não tem mais perguntas não respondidas!")

        const randomIndex = (Math.random() * availableQuestions.length) | 0;
        const question = availableQuestions[randomIndex];

        availableQuestions = availableQuestions.splice(randomIndex-1, 1);
        answerdQuestions.
        GameRepository.update(game)
        
        return question;
    }
}

export default GameService;