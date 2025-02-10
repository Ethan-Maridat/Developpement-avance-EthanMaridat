import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { RankingUpdate } from './ranking.update'; // Importer le type d'événement
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RankingEventsService {
    private rankingSubject = new Subject<RankingUpdate>(); // Créer un sujet



    getRankingEvents(): Observable<RankingUpdate> {
        return this.rankingSubject.asObservable(); // Permet au client de s'abonner
    }

    @OnEvent('updated-ranking')
    emitRankingUpdate(rankingData: RankingUpdate) {
        console.log('Mise à jour reçue par RankingEventsService:', rankingData);
        this.rankingSubject.next(rankingData); // Émet un nouvel événement
    }
}
