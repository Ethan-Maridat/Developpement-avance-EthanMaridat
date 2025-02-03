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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService {
    constructor(playerService) {
        this.playerService = playerService;
        this.matches = [];
        this.idCounter = 1;
    }
    getAllMatches() {
        return this.matches;
    }
    addMatch(player1, player2, winner) {
        const newMatch = { id: this.idCounter++, player1, player2, winner };
        this.matches.push(newMatch);
        const winnerPlayer = this.playerService.updatePlayerScore(winner, 10);
        if (winnerPlayer) {
            console.log(`Score mis à jour pour le gagnant: ${winnerPlayer.name}`);
        }
        return newMatch;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map