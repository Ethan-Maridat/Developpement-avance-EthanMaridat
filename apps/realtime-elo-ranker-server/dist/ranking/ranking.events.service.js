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
exports.RankingEventsService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const ranking_update_1 = require("./ranking.update");
const event_emitter_1 = require("@nestjs/event-emitter");
let RankingEventsService = class RankingEventsService {
    constructor() {
        this.rankingSubject = new rxjs_1.Subject();
    }
    getRankingEvents() {
        return this.rankingSubject.asObservable();
    }
    emitRankingUpdate(rankingData) {
        console.log('Mise à jour reçue par RankingEventsService:', rankingData);
        this.rankingSubject.next(rankingData);
    }
};
exports.RankingEventsService = RankingEventsService;
__decorate([
    (0, event_emitter_1.OnEvent)('updated-ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_update_1.RankingUpdate]),
    __metadata("design:returntype", void 0)
], RankingEventsService.prototype, "emitRankingUpdate", null);
exports.RankingEventsService = RankingEventsService = __decorate([
    (0, common_1.Injectable)()
], RankingEventsService);
//# sourceMappingURL=ranking.events.service.js.map