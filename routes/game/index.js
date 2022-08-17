import Game from "../../models/Game.js";
import GameService from "../../services/GameService.js";
import GameRepository from "../../repositories/GameRepository.js";

const gameRoutes = async (fastify, opts)=>{
    //Criar jogo
    fastify.post("/", async (req, res)=>{
        const newGame = GameRepository.create();
        
        return newGame;
    });

    //Pegar questão - até acabar o jogo
    fastify.get("/:gameId/question", async (req, res)=>{
        const {gameId ,questionId} = req.params;
        const nextQuestion = GameService.getNextQuestion(gameId, questionId); 
        return nextQuestion;
    });

    //Responder questão - até acabar o jogo
    fastify.post("/:gameId/question/:questionId", async (req, res)=>{
        const {gameId ,questionId} = req.params;
        const nextQuestion = GameService.getNextQuestion(gameId, questionId); 
        return nextQuestion;
    });

}
export default gameRoutes;