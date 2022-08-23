import Question from "../models/Question.js";
import Game from "../models/Game.js";

class GameRepository{
    static async create(){
        const allQuestions = await Question.find({});
        const newGame = new Game({answerdQuestions:[], availableQuestions: [...allQuestions], isOver:false, total:0, correct:0});
        await newGame.save();

        return newGame;
    }

    static async getById(id){
        Game.validateId(id);
        const game = await Game.findOne({_id: id});
        if(!game)
            throw new NotFoundError();
        
        return game;
    }

    static async update({_id, answerdQuestions, availableQuestions, total, correct, wrong, isOver}){
        Game.validateId(_id);
        let game = await Game.findOne({_id});
        if(!game)
            throw new NotFoundError();

        game = Object.assign(game, { answerdQuestions, availableQuestions, total, correct, wrong, isOver});
        game._id = _id;
        game.save();
    }
} 

export default GameRepository;