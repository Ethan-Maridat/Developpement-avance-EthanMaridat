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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../player/player.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_update_1 = require("../ranking/ranking.update");
let PlayerService = class PlayerService {
    constructor(playerRepository, eventEmitter) {
        this.playerRepository = playerRepository;
        this.eventEmitter = eventEmitter;
    }
    async findAll() {
        return this.playerRepository.find();
    }
    async findOne(id) {
        return this.playerRepository.findOneBy({ id }) || null;
    }
    async create(id) {
        const player = this.playerRepository.create({ id, rank: 300 });
        this.eventEmitter.emit('updated-ranking', new ranking_update_1.RankingUpdate(player.id, player.rank));
        return this.playerRepository.save(player);
    }
    async update(player) {
        return this.playerRepository.save(player);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map