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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const ranking_events_service_1 = require("./ranking.events.service");
const rxjs_1 = require("rxjs");
let RankingController = class RankingController {
    constructor(rankingService, rankingEventsService) {
        this.rankingService = rankingService;
        this.rankingEventsService = rankingEventsService;
    }
    async getRanking() {
        return this.rankingService.getRanking();
    }
    rankingEvents() {
        console.log('Client SSE connecté');
        return this.rankingEventsService.getRankingEvents().pipe((0, rxjs_1.map)((data) => {
            console.log('Envoi d’un événement SSE:', data);
            return {
                data: JSON.stringify({
                    type: 'RankingUpdate',
                    player: {
                        id: data.id,
                        rank: data.rank,
                    }
                })
            };
        }));
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('events'),
    (0, common_1.Sse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "rankingEvents", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        ranking_events_service_1.RankingEventsService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map