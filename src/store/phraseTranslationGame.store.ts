import { observable, action, makeObservable } from 'mobx';
import { Card } from '../api/card/types';
import { Dictionary } from './types';

export class PhraseTranslationGameStore {
  pickedDictionary: Dictionary | null = null;
  cards: Card[] = [];

  constructor() {
    makeObservable(this, {
      cards: observable,
      pickedDictionary: observable,

      setCards: action.bound,
      setPickedDictionary: action.bound,
    });
  }

  public setCards = (cards: Card[]) => {
    this.cards = cards;
  };

  public setPickedDictionary = (dictionary: Dictionary | null) => {
    this.pickedDictionary = dictionary;
  };
}
