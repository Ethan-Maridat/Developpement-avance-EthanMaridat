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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const player_service_1 = require("../player/player.service");
let MatchController = class MatchController {
    constructor(matchService, playerService) {
        this.matchService = matchService;
        this.playerService = playerService;
    }
    async create(matchData) {
        if (!matchData.loser || matchData.loser === '') {
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: 'L\'identifiant du joueur perdant est manquant.'
            };
        }
        if (!matchData.winner || matchData.winner === '') {
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: 'L\'identifiant du joueur gagnant est manquant.'
            };
        }
        if (matchData.loser === matchData.winner) {
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: 'Le joueur gagnant et le joueur perdant ne peuvent pas être les mêmes.'
            };
        }
        const existLoser = await this.playerService.findOne(matchData.loser);
        const existWinner = await this.playerService.findOne(matchData.winner);
        if (!existLoser || !existWinner) {
            return {
                code: common_1.HttpStatus.BAD_REQUEST,
                message: 'Le joueur gagnant ou perdant n\'existe pas.'
            };
        }
        return this.matchService.createMatch(matchData.loser, matchData.winner, matchData.draw);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "create", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('/api/match'),
    __metadata("design:paramtypes", [match_service_1.MatchService,
        player_service_1.PlayerService])
], MatchController);
//# sourceMappingURL=match.controller.js.map