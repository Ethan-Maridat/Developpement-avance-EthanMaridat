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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ranking_entity_1 = require("./ranking.entity");
const player_entity_1 = require("../player/player.entity");
let RankingService = class RankingService {
    constructor(rankingRepository, playerRepository) {
        this.rankingRepository = rankingRepository;
        this.playerRepository = playerRepository;
        this.K = 32;
    }
    async getRanking() {
        return this.rankingRepository.find();
    }
    async updateRanking(winnerName, loserName) {
        const winner = await this.playerRepository.findOne({
            where: { id: winnerName },
        });
        const loser = await this.playerRepository.findOne({
            where: { id: loserName },
        });
        if (!winner || !loser) {
            throw new Error('Les joueurs spécifiés ne sont pas trouvés');
        }
        const winnerRanking = await this.rankingRepository.findOne({
            where: { player: winner },
        });
        const loserRanking = await this.rankingRepository.findOne({
            where: { player: loser },
        });
        if (!winnerRanking || !loserRanking) {
            throw new Error('Les rankings des joueurs ne sont pas trouvés');
        }
        const WeWinner = 1 / (1 + Math.pow(10, (loserRanking.rank - winnerRanking.rank) / 400));
        const WeLoser = 1 / (1 + Math.pow(10, (winnerRanking.rank - loserRanking.rank) / 400));
        winnerRanking.rank = Math.round(winnerRanking.rank + this.K * (1 - WeWinner));
        loserRanking.rank = Math.round(loserRanking.rank + this.K * (0 - WeLoser));
        await this.rankingRepository.save([winnerRanking, loserRanking]);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ranking_entity_1.Ranking)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RankingService);
//# sourceMappingURL=ranking.service.js.map