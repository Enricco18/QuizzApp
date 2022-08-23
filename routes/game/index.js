import Game from "../../models/Game.js";
import GameService from "../../services/GameService.js";
import GameRepository from "../../repositories/GameRepository.js";

const gameRoutes = async (fastify, opts)=>{
    //Pega todos jogo
    fastify.get("/", async (req, res)=>{
        const games = await Game.find({});
        
        return games;
    });
    //Criar jogo
    fastify.post("/", async (req, res)=>{
        const newGame = await GameRepository.create();
        
        return newGame;
    });

    //Pegar questão - até acabar o jogo
    fastify.get("/:gameId/question", async (req, res)=>{
        const {gameId } = req.params;
        const nextQuestion = await GameService.getNextQuestion(gameId); 
        return nextQuestion;
    });

    //Responder questão - até acabar o jogo
    fastify.post("/:gameId/question/:questionId", async (req, res)=>{
        const {gameId ,questionId} = req.params;
        const {answerId} = req.body;
        const response = await GameService.answerQuestion(gameId, questionId, answerId); 
        return response;
    });

}
export default gameRoutes;