"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./match.entity");
const player_service_1 = require("../player/player.service");
const ranking_events_service_1 = require("../ranking/ranking.events.service");
const ranking_update_1 = require("../ranking/ranking.update");
const event_emitter_1 = require("@nestjs/event-emitter");
let MatchService = class MatchService {
    constructor(matchRepository, playerService, rankingEventsService, eventEmitter) {
        this.matchRepository = matchRepository;
        this.playerService = playerService;
        this.rankingEventsService = rankingEventsService;
        this.eventEmitter = eventEmitter;
    }
    calculateElo(ratingA, ratingB, scoreA, scoreB) {
        const K = 32;
        const probabilityA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
        const probabilityB = 1 - probabilityA;
        const newRatingA = Math.round(ratingA + K * (scoreA - probabilityA));
        const newRatingB = Math.round(ratingB + K * (scoreB - probabilityB));
        return [newRatingA, newRatingB];
    }
    async createMatch(loserId, winnerId, draw) {
        const loserPlayer = await this.playerService.findOne(loserId);
        const winnerPlayer = await this.playerService.findOne(winnerId);
        if (!loserPlayer || !winnerPlayer) {
            throw new Error('Player not found');
        }
        const scoreWinner = draw ? 0.5 : 1;
        const scoreLoser = draw ? 0.5 : 0;
        const [newRankWinner, newRankLoser] = this.calculateElo(winnerPlayer.rank, loserPlayer.rank, scoreWinner, scoreLoser);
        winnerPlayer.rank = newRankWinner;
        loserPlayer.rank = newRankLoser;
        await this.playerService.update(winnerPlayer);
        await this.playerService.update(loserPlayer);
        console.log('Émission de l’événement updated-ranking', winnerPlayer.id, winnerPlayer.rank);
        this.eventEmitter.emit('updated-ranking', new ranking_update_1.RankingUpdate(winnerPlayer.id, winnerPlayer.rank));
        console.log('Émission de l’événement updated-ranking', loserPlayer.id, loserPlayer.rank);
        this.eventEmitter.emit('updated-ranking', new ranking_update_1.RankingUpdate(loserPlayer.id, loserPlayer.rank));
        const match = this.matchRepository.create({
            loser: loserPlayer,
            winner: winnerPlayer,
            draw,
        });
        return this.matchRepository.save(match);
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        player_service_1.PlayerService,
        ranking_events_service_1.RankingEventsService,
        event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map