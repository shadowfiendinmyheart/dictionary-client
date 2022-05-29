import { observable, action, makeObservable } from 'mobx';
import { Card } from '../api/card/types';
import { Dictionary } from './types';

export interface GameCard extends Card {
  isAnswered: boolean;
  answer: string;
}

export class PhraseTranslationGameStore {
  pickedDictionary: Dictionary | null = null;
  gameCards: GameCard[] = [];
  gameCounter = 0;
  associationCounter = 0;
  isGameEnd = false;

  constructor() {
    makeObservable(this, {
      gameCards: observable,
      pickedDictionary: observable,
      gameCounter: observable,
      associationCounter: observable,
      isGameEnd: observable,

      setGameCards: action.bound,
      updateGameCard: action.bound,
      setGameCounter: action.bound,
      incrementGameCounter: action.bound,
      setPickedDictionary: action.bound,
      setAssociationCounter: action.bound,
      incrementAssociationCounter: action.bound,
      decrementAssociationCounter: action.bound,
      setGameEnd: action.bound,
    });
  }

  public setGameCards = (cards: Card[]) => {
    this.gameCards = cards.map((card) => {
      return { ...card, isAnswered: false, answer: '' };
    });
  };

  public updateGameCard = (cardId: number, isAnswered: boolean, answer: string) => {
    this.gameCards[cardId] = { ...this.gameCards[cardId], isAnswered, answer };
  };

  public setPickedDictionary = (dictionary: Dictionary | null) => {
    this.pickedDictionary = dictionary;
  };

  public setGameCounter = (value: number) => {
    if (value < 0) return;

    this.gameCounter = value;
  };

  public incrementGameCounter = () => {
    if (this.gameCounter === this.gameCards.length - 1) {
      return false;
    }

    this.gameCounter++;
    return true;
  };

  public setAssociationCounter = (value: number) => {
    if (value < 0) return;

    this.associationCounter = value;
  };

  public incrementAssociationCounter = () => {
    if (
      this.associationCounter ===
      this.gameCards[this.gameCounter].associations.length - 1
    ) {
      return false;
    }

    this.associationCounter++;
    return true;
  };

  public decrementAssociationCounter = () => {
    if (this.associationCounter === 0) {
      return false;
    }

    this.associationCounter--;
    return true;
  };

  public setGameEnd = (value: boolean) => {
    this.isGameEnd = value;
  };
}
