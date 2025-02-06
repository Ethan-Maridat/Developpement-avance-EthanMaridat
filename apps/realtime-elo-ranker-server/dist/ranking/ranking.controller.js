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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RankingController = class RankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    getClassement() {
        return (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.map)(() => new MessageEvent('message', { data: 'Classement mis à jour' })));
    }
    async updateRanking(winnerName, loserName) {
        await this.rankingService.updateRanking(winnerName, loserName);
        return { message: 'Ranking mis à jour' };
    }
    async getRanking() {
        return this.rankingService.getRanking();
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_2.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "getClassement", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)('winnerId')),
    __param(1, (0, common_1.Body)('loserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "updateRanking", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRanking", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map